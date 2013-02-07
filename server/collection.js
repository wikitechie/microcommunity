var _ = require('underscore')
	, async = require('async')

var mongodb = require('mongodb')
	, MongoCollection = mongodb.Collection
	, ObjectId = mongodb.ObjectID

function Collection(db, collectionName, options){	
	this.container = require('./container')
	MongoCollection.call(this, db, collectionName)	 
	this.db = db					
	this.joins = []		
	if(options && options.joins){
		for (k in options.joins){	
			this.joins.push({ field : k, collection : options.joins[k] })		
		}	
		console.log(this.joins)		
	}				
}

Collection.prototype = MongoCollection.prototype

Collection.prototype.findById = function(id, callback){
	obj = ObjectId(id)
	var self = this	
	this.findOne({ _id : obj }, function(err, obj){	
		if(err) throw err
		if(self.joins.length > 0 ){					
			//var j = { field : 'author', collection : 'users' }	
			async.map( self.joins, 
				function(j, callback){
						//console.log(obj[j.field])	
						self.getCollection(j.collection)
							.findOne({ _id : obj[j.field] }, function(err, joined_doc){	
								if(err) throw err			
								_.extend(j, { doc : joined_doc })
								callback(null, j)			
						})				
				}, function(err, results){
					var extension = {}	
					results.forEach(function(result){
							extension[result.field] = result.doc							
					})
					_.extend(obj, extension)				
					callback(err, obj)					
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
