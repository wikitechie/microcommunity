var mongoose = require('mongoose')
	, models = require('microcommunity').models
	, isContent = models.plugins.isContent

var fileSchema = new mongoose.Schema({
	name: String,
	description : String,
})

fileSchema.plugin(isContent)

models.define('File', 'file', 'files', fileSchema)
