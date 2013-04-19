var mongoose = require('mongoose')
	, dbref = require("mongoose-dbref")
	, loaded = dbref.install(mongoose)
	, _ = require('underscore')
	, async = require('async')
	, models = require('./index')

var wallSchema = new mongoose.Schema({
	owner : { type : mongoose.Schema.Types.DBRef },
	displayName : String
})

wallSchema.statics.loadItems = function(id, callback){
	var Item = mongoose.model('Item')	
	this.findById(id, function(err, wall){	
		Item.fetchItems({ wall : id }, function(err, items){		
			callback(err, { _id : id, owner : wall.owner.oid,	items : items })					
		})		
	})	
}

module.exports = mongoose.model('Wall', wallSchema)
