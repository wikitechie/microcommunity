var mongoose = require('mongoose')
	, models = require('./index')
	, itemable = require('./itemable')

var schemaOptions = {
  toJSON: {
    virtuals: true
  }
}

var postSchema = new mongoose.Schema({
	content: String
}, schemaOptions)

postSchema.virtual('objectType').get(function(){ return 'post' })

postSchema.plugin(itemable)

var Post = mongoose.model('Post', postSchema)
