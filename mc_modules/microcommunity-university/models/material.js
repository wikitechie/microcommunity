var mongoose = require('mongoose')
	, models = require('microcommunity/models/index')
	//, hasWall = require('microcommunity/models/plugins/haswall')
	//, hasStream = require('microcommunity/models/plugins/has-stream')	

var materialSchema = new mongoose.Schema({
	name: String,
	description : String,
	currentSemester : { type : mongoose.Schema.Types.ObjectId, ref : 'Semester' }	
})

models.define('Material', 'material', 'materials', materialSchema)
