var mongoose = require('mongoose')
	, models = require('./index')
	, itemable = require('./plugins/itemable')

var schemaOptions = {
  toJSON: {
    virtuals: true
  }
}

var activitySchema = new mongoose.Schema({
	wikipage : { type : mongoose.Schema.Types.ObjectId, ref : 'Wikipage' }
}, schemaOptions)

activitySchema.pre('init', function(next, doc){
	this.model('NewWikipageActivity').populate(doc, 'wikipage', next)	
})

activitySchema.virtual('objectType').get(function(){ return 'activity:new-wikipage' })

activitySchema.plugin(itemable)

var Activity = mongoose.model('NewWikipageActivity', activitySchema)
