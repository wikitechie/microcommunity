var mongoose = require('mongoose')
	, models = require('microcommunity/models/index')
	, isContainer = require('microcommunity/models/plugins/is-container')		

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

models.define('Material', 'material', 'containers', materialSchema)
