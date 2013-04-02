var _ = require('underscore')
	, async = require('async')
	, RefResolvers = require('./refresolvers')

var mongodb = require('mongodb')
	, MongoCollection = mongodb.Collection
	, ObjectId = mongodb.ObjectID

function Collection(db, collectionName, options){
	if(!db.instance) throw new Error('Cannot create a collection without a mongodb Db object')
	if(!collectionName) throw new Error('Cannot create a collection without a collection name')		
	MongoCollection.call(this, db.instance, collectionName)	 
	this.database = db

	this._relations = {}
	var self = this
	if (options && options.relations){		
		options.relations.forEach(function(relation){
			if (!self._relations.hasOwnProperty(relation.type)){
				self._relations[relation.type] = []
			}
			self._relations[relation.type].push(relation)			
		})		
	}
	
}

Collection.prototype = MongoCollection.prototype

Collection.prototype.resolveRelationType = function(doc, type, callback){
	switch(type) {
		case "singleRef":
			this.resolveSingleRefs(doc, this._relations[type], callback)
			break;
		case "DBRef":
			this.resolveDBRefs(doc, this._relations[type], callback)
			break;		
		case "multiRef":
			this.resolveMultiRefs(doc, this._relations[type], callback)
			break;
		case "arrayDescriptor":
			this.fetchArrayEmbededDocsJoins(doc, this._relations[type], callback)
			break;							
	}
}

Collection.prototype.resolveAllDocJoins = function(doc, callback){
	var self = this	
	
	function processRelation(type, options){		
		if (options && options.first){
			return function(callback){
				if (self.hasRelationType(type)){
					self.resolveRelationType(doc, type, callback)
				}	else {
					callback(null, doc)		
				}				
			}		
		} else {
			return function(doc, callback){
				if (self.hasRelationType(type)){
					self.resolveRelationType(doc, type, callback)
				}	else {
					callback(null, doc)		
				}				
			}		
		}
	}
	
	async.waterfall([
		processRelation('singleRef', {first : true}),	
		processRelation('DBRef'), processRelation('multiRef'), processRelation('arrayDescriptor'),
	], 
	function(err, doc){	
		callback(err, doc)			
	})	
}

Collection.prototype.resolveArrayJoins = function(array, callback){
	var self = this
	async.map(array, 
		function(item, callback){
			self.resolveAllDocJoins(item, callback)			
		}, function(err, array){
			callback(null, array)			
		})
}


Collection.prototype.findById = function(id, callback){

	var doc = ObjectId(id)
	var self = this	
	
	this.findOne({ _id : doc }, function(err, doc){			
		self.resolveAllDocJoins(doc, function(err, doc){
			callback(err, doc)
		})
	})		
}

Collection.prototype.create = function(attr, callback){
	var self = this
	this.insert( attr, function(err, docs){
		self.resolveAllDocJoins(docs[0], callback)
	})
}

Collection.prototype.updateAttr = function(id, updated, callback){
	this.findAndModify({ _id : ObjectId(id) }, [['_id','asc']], { $set : updated }, { new : true }, callback)
}


RefResolvers.mixin(Collection)
module.exports = Collection

