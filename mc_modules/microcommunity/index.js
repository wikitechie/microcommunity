var connect = require('connect')
	, express = require('express')
	, utils = connect.utils
	, proto = require('./application')
	, auth = require('./auth')	
	, models = require('./models')
	, items = require('./items')	



//setting up app and plugin functions
module.exports.createApplication = createApplication
module.exports.plugin = createPlugin
module.exports.auth = auth

//setting up models
models.initialize()
module.exports.models = models
module.exports.items = items

var app = exports.app

function createApplication(path){
	app = express()
  utils.merge(app, proto)
	app.initApplication(path)
	return app
}

function createPlugin(path){
	var plugin = express()
  utils.merge(plugin, proto)
	plugin.initPlugin(path)
	return plugin	
}

