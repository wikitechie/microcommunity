var mongoose = require('mongoose')
	, models = require('microcommunity').models
	, items = require('microcommunity').items	
	, isItem = models.plugins.isItem

var activitySchema = new mongoose.Schema({
	wikipage : { type : mongoose.Schema.Types.ObjectId, ref : 'Wikipage' }
})

activitySchema.statics.populateItem =  function(doc, next){
	models.model('NewWikipageActivity').populate(doc, 'wikipage', next)	
}

activitySchema.plugin(isItem, { objectType : 'activity:new-wikipage' })

module.exports = activitySchema
