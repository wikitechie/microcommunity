var mongoose = require('mongoose')
	, models = require('microcommunity').models
	, items = require('microcommunity').items
	, isItem = models.plugins.isItem

var schema = new mongoose.Schema({
	file : { type : mongoose.Schema.Types.ObjectId, ref : 'File' }
})

schema.pre('init', function(next, doc){
	this.model('NewFileActivity').populate(doc, 'file', next)	
})

schema.plugin(isItem)

models.define('NewFileActivity', 'activity:new-file', 'newfileactivities', schema)
items.addItem('NewFileActivity', 'componenets/new-file-activity/model')
