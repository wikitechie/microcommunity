var mongoose = require('mongoose')
	, models = require('microcommunity').models
	, items = require('microcommunity').items
	, isItem = models.plugins.isItem

var photoSchema = new mongoose.Schema({
	content: String,
	filePath : String,
})

photoSchema.plugin(isItem, { objectType : 'photo' })

Photo = models.define('Photo', 'photo', 'items', photoSchema)
items.addItem('Photo', 'models/items/photo')

