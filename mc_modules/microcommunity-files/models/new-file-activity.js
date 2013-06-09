var mongoose = require('mongoose')
	, models = require('microcommunity/models/index')
	, itemable = require('microcommunity/models/plugins/itemable')

var schema = new mongoose.Schema({
	file : { type : mongoose.Schema.Types.ObjectId, ref : 'File' }
})

schema.pre('init', function(next, doc){
	this.model('NewFileActivity').populate(doc, 'file', next)	
})

schema.plugin(itemable)

models.define('NewFileActivity', 'activity:new-file', 'newfileactivities', schema)
models.items.addItem('NewFileActivity', 'componenets/new-file-activity/model')
