var _ = require('underscore')

var itemsModules = []

var publishersPaths = []

function subModelTypes(){
	var output = {}
	var models = require('./index')			
	itemsModules.forEach(function(module){	
		var itemType = models.convert(module.model, 'model', 'object')
		output[itemType] = 'Core.Item.' + module.model	
	})
	return output
}

exports.addItem = function(model, path){
	itemsModules.push({
		path : path,
		model : model
	})
}

exports.addPublisher = function(path){
	publishersPaths.push(path)
}

exports.exportPublishers = function(){
	return publishersPaths
}

//the output of this function is used in models/items-index.js 
exports.exportItemsModulesForClient = function(){
	return {
		models : _.pluck(itemsModules, 'model'),
		paths : _.pluck(itemsModules, 'path'),
		subModelTypes : subModelTypes()
	}
}

