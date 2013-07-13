var mongoose = require('mongoose')
	, models = require('microcommunity').models
	, items = require('microcommunity').items	
	, isItem = models.plugins.isItem

var activitySchema = new mongoose.Schema({
	homework : { type : mongoose.Schema.Types.ObjectId, ref : 'Homework' }
})

activitySchema.pre('init', function(next, doc){
	this.model('NewHomeworkActivity').populate(doc, 'homework', next)	
})

activitySchema.plugin(isItem, { objectType : 'activity:new-homework' })

module.exports = activitySchema
