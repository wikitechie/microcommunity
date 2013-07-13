var mongoose = require('mongoose')
	, isContainer = require('./plugins/is-container')		

var containerSchema = new mongoose.Schema({}, { discriminatorKey : 'containerType'  })

containerSchema.plugin(isContainer)

module.exports = containerSchema
