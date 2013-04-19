var mongoose = require('mongoose')
	, models = require('./index')
	, itemable = require('./plugins/itemable')

var photoSchema = new mongoose.Schema({
	content: String
})

photoSchema.plugin(itemable)

var Photo = models.define('Photo', 'photo', 'photos', photoSchema)


