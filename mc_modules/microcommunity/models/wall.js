var mongoose = require('mongoose')
	, dbref = require("mongoose-dbref")
	, loaded = dbref.install(mongoose)
	, _ = require('underscore')
	, async = require('async')

var wallSchema = new mongoose.Schema({
	owner : { type : mongoose.Schema.Types.DBRef },
	displayName : String
})

wallSchema.statics.loadItems = function(id, callback){
	var Item = mongoose.model('Item')	
	Item.fetchItems({ walls : id }, callback)	
}

module.exports = wallSchema
