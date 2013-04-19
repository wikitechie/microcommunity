var mongoose = require('mongoose')
	, dbref = require("mongoose-dbref")
	, loaded = dbref.install(mongoose)
	, _ = require('underscore')
	, async = require('async')
	, models = require('./index')

var streamSchema = new mongoose.Schema({
	owner : { type : mongoose.Schema.Types.DBRef },
})

streamSchema.statics.loadItems = function(id, callback){
	var Item = mongoose.model('Item')	
	Item.fetchItems({ streams : id }, callback)	
}

streamSchema.statics.globalStream = function(callback){
	var Item = mongoose.model('Item')	
	Item.fetchItems({}, callback)
}

module.exports = mongoose.model('Stream', streamSchema);

