var mongoose = require('mongoose')
	, dbref = require("mongoose-dbref")
	, loaded = dbref.install(mongoose)
	,  _ = require('underscore')
	, async = require('async')
	, models = require('../models')

var itemSchema = new mongoose.Schema({
	object : { type : mongoose.Schema.Types.DBRef },
	wall : mongoose.Schema.Types.ObjectId,
	walls : [mongoose.Schema.Types.ObjectId],
	streams : [mongoose.Schema.Types.ObjectId],	
	published : Date
})

itemSchema.statics.resolveDBRef = function(dbref, callback){						
	var modelName = models.convert(dbref.namespace, 'collection', 'model')
	mongoose.model(modelName).findById(dbref.oid).exec(function(err, item){
		callback(err, item)
	})
}

itemSchema.statics.findItem = function(id, callback){
	this.findById(id, function(err, item){
		item.resolve(callback)
	})
}

itemSchema.methods.resolve = function(callback){
	var Item = mongoose.model('Item')
	Item.resolveDBRef(this.object, callback)
}

itemSchema.statics.fetchItems = function (query, callback){
	var self = this
	this.find(query).sort({ published : -1 }).limit(10).exec(function(err, items){				
		var dbrefs = _.pluck(items, 'object')
		
		function fetchItem(dbref, callback){ 
			self.resolveDBRef(dbref, function(err, item){
				var obj = item ? item.toJSON() : item
				callback(err, obj)
			}) 
		}
				
		async.map(dbrefs, fetchItem, function(err, items){		
			callback(err, items)					
		})				
	})	
}

module.exports = itemSchema

