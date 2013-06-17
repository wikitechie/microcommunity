var mongoose = require('mongoose')
	, models = require('microcommunity').models
	, items = require('microcommunity').items	
	, isItem = models.plugins.isItem

var postSchema = new mongoose.Schema({
	content: String
})

postSchema.plugin(isItem)

models.define('Post', 'post', 'posts', postSchema)
items.addItem('Post', 'models/items/post')
items.addPublisher('views/publishers/post')
