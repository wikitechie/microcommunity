var mongoose = require('mongoose')
	, models = require('microcommunity/models')
	, itemable = require('microcommunity/models/plugins/itemable')

var postSchema = new mongoose.Schema({
	content: String
})

postSchema.plugin(itemable, { clientPath : 'models/items/post' })

models.define('Post', 'post', 'posts', postSchema)
models.items.addItem('Post', 'models/items/post')
