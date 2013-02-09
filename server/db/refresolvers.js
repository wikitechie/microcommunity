var	async = require('async')
	, _ = require('underscore')

function RefResolvers(){}

RefResolvers.prototype.applyRefs = function (doc, refs, callback){
	var extension = {}
	refs.forEach(function(ref){
		if(ref)
			extension[ref.field] = ref.doc							
	})
	_.extend(doc, extension)				
	callback(null, doc)
}

RefResolvers.prototype.resolveRef = function(doc, ref, callback){
	this.getCollection(ref.collection)
		.findOne({ _id : doc[ref.field] }, function(err, doc){
			if(err) throw err			
			_.extend(ref, { doc : doc })
			callback(null, ref)			
	})
}

RefResolvers.prototype.resolveSingleRefs = function(doc, singleRefs, callback){
	var self = this
	async.map( singleRefs, 
		function(singleRef, callback){
			self.resolveRef(doc, singleRef, callback)
		}, function(err, singleRefs){
			self.applyRefs(doc, singleRefs, callback)				
		})
}

RefResolvers.prototype.resolveMultiRefs = function(doc, multiRefs, callback){
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

RefResolvers.prototype.fetchArrayEmbededDocsJoins = function(doc, arrayDescriptors, callback){
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

RefResolvers.prototype.resolveDBRefs = function(doc, DBRefs, callback){
	self = this	
	async.map(DBRefs, 
		function(DBRef, callback){		
			collectionName = doc[DBRef.field].namespace
			id = doc[DBRef.field].oid.toString()
	
			self.getCollection(collectionName).findById(id, function(err, object){
				_.extend(DBRef, { doc : object })
				callback(null, DBRef)		
			})			
	}, function(err, resolvedDBRefs){
		self.applyRefs(doc, resolvedDBRefs, callback)	
	})
}

RefResolvers.prototype.hasSingleRefs = function(){
	return (this.singleRefs && this.singleRefs.length > 0)
}

RefResolvers.prototype.hasDBRefs = function(){
	return (this.DBRefs && this.DBRefs.length > 0)
}

RefResolvers.prototype.hasMultiRefs = function(){
	return (this.multiRefs && this.multiRefs.length > 0)
}

RefResolvers.prototype.hasArrayDescriptors = function(){
	return (this.multiRefs && this.arrayDescriptors.length > 0)
}

RefResolvers.mixin = function(destObject){
	for( property in RefResolvers.prototype ){
    destObject.prototype[property] = RefResolvers.prototype[property];	
	}
}

module.exports = RefResolvers
