var connect = require('connect')
	, express = require('express')
	, utils = connect.utils
	, proto = require('./application')
	, auth = require('./auth')	
	, models = require('./models')
	, items = require('./items')
	, sidebars = require('./sidebars')

//setting up app and plugin functions
module.exports.createApplication = createApplication
module.exports.plugin = function(path){
	return createPlugin(path)	
}
module.exports.auth = auth

//setting up models
models.initialize()
module.exports.models = models
module.exports.items = items
module.exports.model = models.getModel
module.exports.sidebars = sidebars

//registration methods
var mainPath
var pluginPaths = []

module.exports.registerApp = function(path){
	mainPath = path
}

module.exports.registerPlugin = function(path){
	pluginPaths.push(path)
}

module.exports.dirname = __dirname

//find the client modules in an app/plugin
function findModules(path, callback){ 
	var exec = require('child_process').exec;
	exec("find . -name '*.js'", {
	  timeout: 10000,
	  cwd: path + "/client/apps"
	}, function(err, stdout, stdin){
		var array = stdout.split('\n')
		array.pop()		
		var modules = []		
		array.forEach(function(module){
			var info = {}						
			var relativePath = module.substring(1)
			info.path = relativePath
			
			var moduleName = relativePath.substring(0, relativePath.length-3)
			info.name = moduleName
			
			modules.push(info)			
		})	
		callback(null, { basePath : path, modules : modules })		
	})
}

//retrieves all the client modules in the main app and installed plugins
module.exports.listClientModules = function(callback){
	var allPaths = pluginPaths
	allPaths.push(mainPath)
	
	var async = require('async')
	async.map(allPaths, findModules, callback)
}

function createApplication(){
	app = express()
  utils.merge(app, proto)
  models.start()
	app.initApplication(mainPath)
	return app
}

function createPlugin(path){
	var plugin = express()
  utils.merge(plugin, proto)
	plugin.initPlugin(path)
	return plugin	
}

