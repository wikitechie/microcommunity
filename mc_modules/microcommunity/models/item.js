var mongoose = require('mongoose')
	, models = require('../models')
	, isItem = models.plugins.isItem

var itemSchema = new mongoose.Schema({}, { discriminatorKey : 'objectType'  })
itemSchema.plugin(isItem, { objectType : 'item' })

itemSchema.statics.fetchItems = function (query, callback){
	this.find(query).sort({ published : -1 }).limit(10).exec(callback)	
}

itemSchema.statics.pager = function (query, base, page, pageSize, callback){
	
	var from = page * pageSize	
	if (base != 0)
		query['_id'] = { $lt : base }	
	this.find(query).sort({ published : -1 }).skip(from).limit(pageSize).exec(callback)	

}

module.exports = itemSchema

