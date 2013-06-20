var mongoose = require('mongoose')
	, models = require('microcommunity').models
	, items = require('microcommunity').items	
	, isItem = models.plugins.isItem

var activitySchema = new mongoose.Schema({
	wikipage : { type : mongoose.Schema.Types.ObjectId, ref : 'Wikipage' }
})

activitySchema.pre('init', function(next, doc){
	this.model('NewWikipageActivity').populate(doc, 'wikipage', next)	
})

activitySchema.plugin(isItem)

module.exports = activitySchema
