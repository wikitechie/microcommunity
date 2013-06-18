var mongoose = require('mongoose')
	, models = require('microcommunity').models
	, items = require('microcommunity').items
	, isItem = models.plugins.isItem

var photoSchema = new mongoose.Schema({
	content: String
})

photoSchema.plugin(isItem)

Photo = models.define('Photo', 'photo', 'photos', photoSchema)
items.addItem('Photo', 'models/items/photo')

