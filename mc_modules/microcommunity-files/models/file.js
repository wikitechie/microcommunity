var mongoose = require('mongoose')
	, models = require('microcommunity').models
	, isContent = models.plugins.isContent

var fileSchema = new mongoose.Schema({
	name: String,
	description : String,
	filePath : String,
})

fileSchema.plugin(isContent)

module.exports = fileSchema
