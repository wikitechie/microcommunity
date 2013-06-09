var mongoose = require('mongoose')
	, models = require('microcommunity/models/index')
	, isContainer = require('microcommunity/models/plugins/is-container')		

var containerSchema = new mongoose.Schema()

containerSchema.plugin(isContainer)

models.define('Container', 'container', 'containers', containerSchema)
