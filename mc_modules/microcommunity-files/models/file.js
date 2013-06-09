var mongoose = require('mongoose')
	, models = require('microcommunity/models/index')
	, isContent = require('microcommunity/models/plugins/is-content')

var fileSchema = new mongoose.Schema({
	name: String,
	description : String,
})

fileSchema.plugin(isContent)

models.define('File', 'file', 'files', fileSchema)
