var mongoose = require('mongoose')
	, isContainer = require('./plugins/is-container')		

var containerSchema = new mongoose.Schema()

containerSchema.plugin(isContainer)

module.exports = containerSchema
