var mongoose = require('mongoose')
	, dbref = require("mongoose-dbref")
	, loaded = dbref.install(mongoose)
	, _ = require('underscore')
	, async = require('async')

var wallSchema = new mongoose.Schema({
	owner : { type : mongoose.Schema.Types.DBRef },
})

wallSchema.statics.loadItems = function(id, callback){
	var Item = mongoose.model('Item')	
	this.findById(id, function(err, wall){
		Item.find({ wall : id }).limit(5).sort({ published : 1 }).exec(function(err, items){				
			var dbrefs = _.pluck(items, 'object')				
			function deref(dbref, callback){
				mongoose.connection.db.dereference(dbref, function(err, item){
					callback(err, item)					
				})
			}				
			async.map(dbrefs, deref, function(err, items){		
				callback(err, { _id : id, owner : wall.owner.oid,	items : items })					
			})				
		})	
	})	
}


module.exports = mongoose.model('Wall', wallSchema);

