var mongoose = require('mongoose')
	, models = require('microcommunity').models
	, items = require('microcommunity').items
	, isItem = models.plugins.isItem

var schema = new mongoose.Schema({
	file : { type : mongoose.Schema.Types.ObjectId, ref : 'File' }
})

schema.statics.populateItem = function(doc, next){
	models.model('NewFileActivity').populate(doc, 'file', next)	
}

schema.plugin(isItem, {objectType : 'activity:new-file' })

module.exports = schema
