var mongoose = require('mongoose')
	, models = require('microcommunity/models/index')
	, hasWall = require('microcommunity/models/plugins/haswall')
	, hasStream = require('microcommunity/models/plugins/has-stream')	

var attachementSchema = new mongoose.Schema({
	title: String,
	description : String,
	object : { type : mongoose.Schema.Types.DBRef }
})

var sectionSchema = new mongoose.Schema({
	title: String,
	description : String,
	attachements : [attachementSchema],
})

var materialSchema = new mongoose.Schema({
	name: String,
	description : String,
	thumbnailPath : String,	
	sections : [sectionSchema],
	currentSemester : { type : mongoose.Schema.Types.ObjectId, ref : 'Semester' }	
})

materialSchema.plugin(hasWall, { displayNameAttribute : 'name' })
materialSchema.plugin(hasStream)

models.define('Material', 'material', 'materials', materialSchema)
