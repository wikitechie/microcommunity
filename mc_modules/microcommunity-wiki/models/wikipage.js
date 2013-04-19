var mongoose = require('mongoose')
	, models = require('microcommunity/models/index')
	, hasWall = require('microcommunity/models/plugins/haswall')

var wikipageSchema = new mongoose.Schema({
	title: String,
	content : String
})

wikipageSchema.plugin(hasWall, { displayNameAttribute : 'title' })

models.define('Wikipage', 'wikipage', 'wikipages', wikipageSchema)


