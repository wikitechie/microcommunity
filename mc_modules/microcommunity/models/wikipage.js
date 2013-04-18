var mongoose = require('mongoose')
	, models = require('./index')
	, hasWall = require('./plugins/haswall')

var wikipageSchema = new mongoose.Schema({
	title: String,
	content : String
})

wikipageSchema.virtual('objectType').get(function(){ return 'wikipage' })

wikipageSchema.plugin(hasWall, { displayNameAttribute : 'title' })

var Wikipage = mongoose.model('Wikipage', wikipageSchema);

