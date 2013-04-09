var mongoose = require('mongoose')
	, dbref = require("mongoose-dbref")
	, loaded = dbref.install(mongoose)
	, _ = require('underscore')
	, async = require('async')
	, models = require('./index')

var wallSchema = new mongoose.Schema({
	owner : { type : mongoose.Schema.Types.DBRef },
})

wallSchema.statics.loadItems = function(id, callback){

	var Item = mongoose.model('Item')	
	var Post = mongoose.model('Post')	
	this.findById(id, function(err, wall){
		Item.find({ wall : id }).sort({ published : -1 }).limit(5).exec(function(err, items){				
			var dbrefs = _.pluck(items, 'object')				
			function deref(dbref, callback){				
				var modelName = models.collectionModelMatch[dbref.namespace]
				mongoose.model(modelName).findById(dbref.oid).exec(callback)
			}				
			async.map(dbrefs, deref, function(err, items){		
				callback(err, { _id : id, owner : wall.owner.oid,	items : items })					
			})				
		})	
	})	
}


module.exports = mongoose.model('Wall', wallSchema);

