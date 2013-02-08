var _ = require('underscore')
	, async = require('async')
	, RefResolvers = require('./refresolvers')

var mongodb = require('mongodb')
	, MongoCollection = mongodb.Collection
	, ObjectId = mongodb.ObjectID

function Collection(db, collectionName, options){	

	container = require('./db').container
	if(!container) throw new Error('Cannot create a collection, container is not ready')
	this.container = container
	
	if(!db) throw new Error('Cannot create a collection without a mongodb Db object')
	if(!collectionName) throw new Error('Cannot create a collection without a collection name')		
	MongoCollection.call(this, db, collectionName)	 
	this.db = db					
	
	if(options){
		this.singleRefs = options.singleRefs
		this.multiRefs = options.multiRefs				
		this.arrayDescriptors = options.arrayDescriptors
	}
	
}

Collection.prototype = MongoCollection.prototype

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

RefResolvers.mixin(Collection)
module.exports = Collection

