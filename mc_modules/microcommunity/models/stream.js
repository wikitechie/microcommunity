var mongoose = require('mongoose')
	, dbref = require("mongoose-dbref")
	, loaded = dbref.install(mongoose)
	, _ = require('underscore')
	, async = require('async')

var streamSchema = new mongoose.Schema({
	owner : { type : mongoose.Schema.Types.DBRef },
})

streamSchema.statics.loadItems = function(id, base, page, pageSize, callback){

	if (typeof base === 'function'){
		callback = base
		base = 0
		page = 0
		pageSize = 10
	} 		

	var Item = mongoose.model('Item')	
	Item.pager({ streams : id }, base, page, pageSize, callback)	
}

streamSchema.statics.globalStream = function(base, page, pageSize, callback){

	if (typeof base === 'function'){
		callback = base
		base = 0
		page = 0
		pageSize = 10
	}
	
	var Item = mongoose.model('Item')	
	Item.pager({}, base, page, pageSize , callback)
	
}

module.exports = streamSchema

