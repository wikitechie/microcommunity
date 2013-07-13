var mongoose = require('mongoose')
	, models = require('microcommunity').models
	, items = require('microcommunity').items	
	, isItem = models.plugins.isItem

var activitySchema = new mongoose.Schema({
	homework : { type : mongoose.Schema.Types.ObjectId, ref : 'Homework' }
})

activitySchema.statics.populateItem = function(doc, next){
	models.model('NewHomeworkActivity').populate(doc, 'homework', next)	
}

activitySchema.plugin(isItem, { objectType : 'activity:new-homework' })

module.exports = activitySchema
