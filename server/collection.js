var _ = require('underscore')
	, async = require('async')

var mongodb = require('mongodb')
	, MongoCollection = mongodb.Collection
	, ObjectId = mongodb.ObjectID

function Collection(db, collectionName, options){	
	this.container = require('./container')
	MongoCollection.call(this, db, collectionName)	 
	this.db = db					
	if(options && options.singleRefs){
		this.singleRefs = options.singleRefs
		this.arrayDescriptors = options.arrayDescriptors
	}
}

Collection.prototype = MongoCollection.prototype

Collection.prototype.resolveSingleRefs = function(doc, singleRefs, callback){
	var self = this
	async.map( singleRefs, 
		function(singleRef, callback){
			self.getCollection(singleRef.collection)
				.findOne({ _id : doc[singleRef.field] }, function(err, joined_doc){	
					if(err) throw err			
					_.extend(singleRef, { doc : joined_doc })
					callback(null, singleRef)			
			})				
		}, function(err, singleRefs){
			var extension = {}	
			singleRefs.forEach(function(singleRef){
					extension[singleRef.field] = singleRef.doc							
			})
			_.extend(doc, extension)				
			callback(err, doc)					
		})
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
			var extension = {}	
			arrayDescriptors.forEach(function(arrayDescriptor){
				if(arrayDescriptor){
					extension[arrayDescriptor.field] = arrayDescriptor.doc							
			}})
			_.extend(doc, extension)				
			callback(err, doc)		
	})	
}

Collection.prototype.hasSingleRefs = function(){
	return (this.singleRefs.length > 0)
}

Collection.prototype.findById = function(id, callback){
	obj = ObjectId(id)
	var self = this	
	this.findOne({ _id : obj }, function(err, obj){	
		if(err) throw err
		if( self.hasSingleRefs() ){	
			self.resolveSingleRefs(obj, self.singleRefs, function(err, joined_doc){
				if (joined_doc.comments){
					self.fetchArrayEmbededDocsJoins(joined_doc, self.arrayDescriptors, function(err, joined_doc){
						callback(err, joined_doc)
					})								
				} else {
					callback(err, joined_doc)				
				}
			})						
		} else {		
			callback(err, obj)			
		}				
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
