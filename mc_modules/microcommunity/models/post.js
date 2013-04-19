var mongoose = require('mongoose')
	, models = require('./index')
	, itemable = require('./plugins/itemable')

var postSchema = new mongoose.Schema({
	content: String
})

postSchema.plugin(itemable)

var Post = models.define('Post', 'post', 'posts', postSchema)
