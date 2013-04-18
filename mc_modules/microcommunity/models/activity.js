var mongoose = require('mongoose')
	, models = require('./index')
	, itemable = require('./plugins/itemable')

var schemaOptions = {
  toJSON: {
    virtuals: true
  }
}

var activitySchema = new mongoose.Schema({
	activityType  : String,
	object : { type : mongoose.Schema.Types.DBRef }
}, schemaOptions)

activitySchema.virtual('objectType').get(function(){ return 'activity' })

activitySchema.plugin(itemable)

var Activity = mongoose.model('Activity', activitySchema)
