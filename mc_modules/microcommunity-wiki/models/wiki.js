var mongoose = require('mongoose')
	, models = require('microcommunity/models/index')
	, hasWall = require('microcommunity/models/plugins/haswall')
	, hasStream = require('microcommunity/models/plugins/has-stream')	

var wikiSchema = new mongoose.Schema({
	name: String,
	description : String
})

wikiSchema.plugin(hasWall, { displayNameAttribute : 'name' })
wikiSchema.plugin(hasStream)

models.define('Wiki', 'wiki', 'wikis', wikiSchema)
