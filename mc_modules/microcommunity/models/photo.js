var mongoose = require('mongoose')
	, models = require('./index')
	, itemable = require('./plugins/itemable')

var schemaOptions = {
  toJSON: {
    virtuals: true
  }
}

var photoSchema = new mongoose.Schema({
	content: String
}, schemaOptions)

photoSchema.virtual('objectType').get(function(){ return 'photo' })

photoSchema.plugin(itemable)

var Photo = mongoose.model('Photo', photoSchema);



