var mongoose = require('mongoose')
	, models = require('microcommunity/models/index')
	, hasWall = require('microcommunity/models/plugins/haswall')
	, hasStream = require('microcommunity/models/plugins/has-stream')	
	, isContent = require('microcommunity/models/plugins/is-content')

var wikipageSchema = new mongoose.Schema({
	title: String,
	content : String
})

wikipageSchema.plugin(hasWall, { displayNameAttribute : 'title' })
wikipageSchema.plugin(hasStream)
wikipageSchema.plugin(isContent)

models.define('Wikipage', 'wikipage', 'wikipages', wikipageSchema)
