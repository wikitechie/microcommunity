var mongoose = require('mongoose')
	, dbref = require("mongoose-dbref")
	, loaded = dbref.install(mongoose)
	,  _ = require('underscore')
	, async = require('async')
	, models = require('./index')

var itemSchema = new mongoose.Schema({
	object : { type : mongoose.Schema.Types.DBRef },
	wall : mongoose.Schema.Types.ObjectId,
	published : Date
})

itemSchema.statics.fetchItems = function (query, callback){
	this.find(query).sort({ published : -1 }).limit(10).exec(function(err, items){				
		var dbrefs = _.pluck(items, 'object')				
		function deref(dbref, callback){				
			var modelName = models.collectionModelMatch[dbref.namespace]
			console.log(dbref)
			mongoose.model(modelName).findById(dbref.oid).exec(function(err, item){
				callback(err, item.toJSON())
			})
		}				
		async.map(dbrefs, deref, function(err, items){		
			callback(err, items)					
		})				
	})	
}

module.exports = mongoose.model('Item', itemSchema);

