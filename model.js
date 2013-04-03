var _ = require('underscore')
	, db = require('./db/db')	
	, async = require('async')

function ModelConstructor(modelName, collectionName){	

	//private members
	var count = 0

	//constructor
	var Constructor = function(hash){
		this._doc = hash || {}
		count++
	}
		
	//public static memebers
	Constructor.modelName = modelName
	Constructor.collection = db.addCollection(collectionName)				
	Constructor.middlewares = { save : { pre : [], post : [] } }	
		
	//public static methods
	_.extend(Constructor, {
		count : function(){ return count },
		create : function(hash, callback){
			callback(null, new Constructor(hash))
		},
		pre : function(namespace, fn){
			Constructor.middlewares[namespace].pre.push(fn)
		},
		post : function(namespace, fn){
			Constructor.middlewares[namespace].post.push(fn)
		}
	})	

	//instance method
	_.extend(Constructor.prototype, {
		save : function(callback){
			var self = this				
			var binded = []	
			Constructor.middlewares['save'].pre.forEach(function(fn){
				binded.push(fn.bind(self))
			})
			async.series(binded)		
		
			var self = this
			Constructor.collection.create( self._doc, function(err, doc){
				if(!err){
					self._doc = doc
			
					var binded = []	
					Constructor.middlewares['save'].post.forEach(function(fn){
						binded.push(fn.bind(self))
					})
					async.series(binded)				
			
					callback()
				}			
			})		
		},

		set : function(key, value){	return this._doc[key] = value },
		get : function(key){ return this._doc[key] },	
		toJSON : function(){ return this._doc },	

	})	
	
	return Constructor		
}

module.exports = ModelConstructor






