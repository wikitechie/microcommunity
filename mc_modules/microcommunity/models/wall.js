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
	Item.fetchItems({ wall : id }, callback)	
}

module.exports = mongoose.model('Wall', wallSchema)
