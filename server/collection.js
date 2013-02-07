var _ = require('underscore')
	, async = require('async')

var mongodb = require('mongodb')
	, MongoCollection = mongodb.Collection
	, ObjectId = mongodb.ObjectID

function Collection(db, collectionName, options){	
	this.container = require('./container')
	MongoCollection.call(this, db, collectionName)	 
	this.db = db					
	if(options){
		this.singleRefs = options.singleRefs
		this.multiRefs = options.multiRefs				
		this.arrayDescriptors = options.arrayDescriptors
	}
}

Collection.prototype = MongoCollection.prototype

Collection.prototype.applyRefs = function (doc, refs, callback){
	var extension = {}
	refs.forEach(function(ref){
		if(ref)
			extension[ref.field] = ref.doc							
	})
	_.extend(doc, extension)				
	callback(null, doc)
}

Collection.prototype.resolveRef = function(doc, ref, callback){
	this.getCollection(ref.collection)
		.findOne({ _id : doc[ref.field] }, function(err, doc){
			if(err) throw err			
			_.extend(ref, { doc : doc })
			callback(null, ref)			
	})
}

Collection.prototype.resolveSingleRefs = function(doc, singleRefs, callback){
	var self = this
	async.map( singleRefs, 
		function(singleRef, callback){
			self.resolveRef(doc, singleRef, callback)
		}, function(err, singleRefs){
			self.applyRefs(doc, singleRefs, callback)				
		})
}

Collection.prototype.resolveMultiRefs = function(doc, multiRefs, callback){
	var self = this	
	async.map(multiRefs, 
		function(multiRef, multiRefCallback){
			ids = doc[multiRef.field]		
			async.map(ids, 
				function(id, idCallback){				
					self.getCollection(multiRef.collection)
						.findOne({ _id : id }, function(err, doc){
							idCallback(null, doc) 					
						})						
				}, function(err, docsArray){
					_.extend(multiRef, {doc : docsArray})
					multiRefCallback(null, multiRef)		
				})						
		}, function(err, multiRefs){
			self.applyRefs(doc, multiRefs, callback)							
		}
	)	
}

Collection.prototype.fetchArrayEmbededDocsJoins = function(doc, arrayDescriptors, callback){
	var self = this	
	async.map(arrayDescriptors, function(arrayDescriptor, arrayDescriptorCallback){
		array = doc[arrayDescriptor.field]			
		if(array){
			async.map(array, 
				function(arrayElement, arrayElementCallback){
					self.resolveSingleRefs(arrayElement, arrayDescriptor.singleRefs, 
					function(err, joinedArrayElement){
						arrayElementCallback(null, joinedArrayElement)		
					})			
				}, function(err, joinedArrayElements){		
					_.extend(arrayDescriptor, { doc : joinedArrayElements })
					arrayDescriptorCallback(null, arrayDescriptor)								
				})
		}	else {
			arrayDescriptorCallback(null, null)								
		}																			
	}, function(err, arrayDescriptors){		
		self.applyRefs(doc, arrayDescriptors, callback)							
	})	
}

Collection.prototype.hasSingleRefs = function(){
	return (this.singleRefs.length > 0)
}

Collection.prototype.hasMultiRefs = function(){
	return (this.multiRefs.length > 0)
}

Collection.prototype.hasArrayDescriptors = function(){
	return (this.arrayDescriptors.length > 0)
}

Collection.prototype.findById = function(id, callback){

	doc = ObjectId(id)
	var self = this	
	
	this.findOne({ _id : doc }, function(err, doc){
			
		async.waterfall([
			function(callback){
				if (self.hasSingleRefs())
					self.resolveSingleRefs(doc, self.singleRefs, callback)
				else
					callback(null, doc)		
			},

			function(doc, callback){
				if (doc.follows)
					self.resolveMultiRefs(doc, self.multiRefs, callback)
				else
					callback(null, doc)		
			},
			function(doc, callback){
				if (self.hasArrayDescriptors())
					self.fetchArrayEmbededDocsJoins(doc, self.arrayDescriptors, callback)
				else
					callback(null, doc)	
			}
		], 
		function(err, results){		
			callback(err, doc)			
		})		
	})		

}

Collection.prototype.create = function(attr, callback){
	this.insert( attr, function(err, docs){
		callback(err, docs[0])
	})		
}

Collection.prototype.getCollection = function(name){
	collection = this.container.collections[name]
	return collection
}

module.exports = Collection;
