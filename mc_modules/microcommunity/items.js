var _ = require('underscore')
	, models = require('./models')

var itemsModules = [
	{ path : 'models/items/photo' , model : 'Photo' },
	{ path : 'models/items/post' , model : 'Post' },			
	{ path : 'activity/model' , model : 'NewWikipageActivity' },								
]

function subModelTypes(){
	var output = {}
	itemsModules.forEach(function(module){	
		var itemType = models.modelObjectMatch[module.model]
		output[itemType] = 'Core.Item.' + module.model	
	})
	return output
}

exports.addItem = function(path, model){
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

