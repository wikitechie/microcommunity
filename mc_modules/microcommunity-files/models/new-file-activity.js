var mongoose = require('mongoose')
	, models = require('microcommunity').models
	, items = require('microcommunity').items
	, isItem = models.plugins.isItem

var commentSchema = new mongoose.Schema({
	content : String,
	author : { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
	published : Date
})

var schema = new mongoose.Schema({
	file : { type : mongoose.Schema.Types.ObjectId, ref : 'File' },
	comments : [ commentSchema ]		
})

schema.statics.populateItem = function(doc, next){
	models.model('NewFileActivity').populate(doc, 'file comments.author', next)	
}

schema.plugin(isItem, {objectType : 'activity:new-file' })

module.exports = schema
