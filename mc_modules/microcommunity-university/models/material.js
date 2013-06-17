var mongoose = require('mongoose')
	, models = require('microcommunity').models
	, isContainer = models.plugins.isContainer

var attachementSchema = new mongoose.Schema({
	title: String,
	description : String,
	object : { type : mongoose.Schema.Types.DBRef }
})

var sectionSchema = new mongoose.Schema({
	title: String,
	description : String,
	highlighted : Boolean,
	attachements : [attachementSchema],
})

var materialSchema = new mongoose.Schema({
	thumbnailPath : String,	
	sections : [sectionSchema]	
})

var containerOptions = { 
	containerType : 'material'
}

materialSchema.plugin(isContainer, containerOptions)

module.exports = materialSchema
