var mongoose = require('mongoose')
	, models = require('microcommunity/models')
	, itemable = require('microcommunity/models/plugins/itemable')

var photoSchema = new mongoose.Schema({
	content: String
})

photoSchema.plugin(itemable)

Photo = models.define('Photo', 'photo', 'photos', photoSchema)
models.items.addItem('Photo', 'models/items/photo')
models.items.addPublisher('views/publishers/photo')

