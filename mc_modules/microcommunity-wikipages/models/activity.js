var mongoose = require('mongoose')
	, models = require('microcommunity/models/index')
	, itemable = require('microcommunity/models/plugins/itemable')

var activitySchema = new mongoose.Schema({
	wikipage : { type : mongoose.Schema.Types.ObjectId, ref : 'Wikipage' }
})

activitySchema.pre('init', function(next, doc){
	this.model('NewWikipageActivity').populate(doc, 'wikipage', next)	
})

activitySchema.plugin(itemable)

models.define('NewWikipageActivity', 'activity:new-wikipage', 'newwikipageactivities', activitySchema)
models.items.addItem('NewWikipageActivity', 'components/activity/model')
