var _ = require('underscore')

//items registery

var itemsModules = []

function subModelTypes(){
	var output = {}
	var models = require('./models')			
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

//the output of this function is used in models/items-index.js 
exports.exportItemsModulesForClient = function(){
	return {
		models : _.pluck(itemsModules, 'model'),
		paths : _.pluck(itemsModules, 'path'),
		subModelTypes : subModelTypes()
	}
}

