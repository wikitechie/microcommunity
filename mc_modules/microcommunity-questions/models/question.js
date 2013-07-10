var mongoose = require('mongoose')
	, models = require('microcommunity').models
	, isItem = models.plugins.isItem
	, isContent = models.plugins.isContent				
	
var questionSchema = new mongoose.Schema({
	content : String
})

questionSchema.plugin(isItem)
questionSchema.plugin(isContent)

module.exports = questionSchema
