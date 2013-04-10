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
	this.findById(id, function(err, stream){	
		Item.fetchItems({ stream : id }, function(err, items){		
			callback(err, { _id : id, owner : stream.owner.oid,	items : items })					
		})		
	})	
}

streamSchema.statics.globalStream = function(callback){
	var Item = mongoose.model('Item')	
	Item.fetchItems({}, function(err, items){		
		callback(err, items)					
	})
}

module.exports = mongoose.model('Stream', streamSchema);

