
var async = require('async')


var abilities = {}

var itemsActions = []

var authorize = module.exports.authorize = function(object, objectType, action, user, callback){	
	abilities[objectType][action](object, user, callback)
}	

var authorizeCollection = module.exports.authorizeCollection = 
	function(collection, objectType, action, user, callback){
		function authorizeForUser(user){
			return function (object, callback){
				authorize(object, objectType, action, user, callback)
			}	
		}

		var async = require('async')
			, test = authorizeForUser(user)				
		async.map(collection, test, callback)
	}
	
var authorizeMiddlewareAPI = module.exports.authorizeMiddlewareAPI = function(objectType, action){
	return function(req, res, next){
		authorize(req[objectType], objectType, action, req.user, function(err){
			if (err) res.send(500)
			else next()			
		})	
	}
}

module.exports.define = function(objectType, action, func, options){
	if (!abilities[objectType]) abilities[objectType] = {}
	abilities[objectType][action] = func
	
	if (options && options.itemAction){
		itemsActions.push({ objectType : objectType, name : action })
	}
	
}

exports.define('item', 'comment', require('./can/item-comment'), { itemAction : true })
exports.define('item', 'delete', require('./can/item-delete'), { itemAction : true })
exports.define('wall', 'publish', require('./can/wall-publish'))
exports.define('comment', 'delete', require('./can/comment-delete'))


module.exports.helpers = require('./can/helpers')

//authorizeItems generators

function generateFunc(collection, objectType, action, user){
	return function (items, callback){
		authorizeCollection(collection, objectType, action, user, callback)
	}
}

function generateFirstFunc(collection, objectType, action, user){
	return function (callback){
		authorizeCollection(collection, objectType, action, user, callback)
	}
}

function generateList(collection, user, actionsList){

	var list = []

	for (var i=0; i<actionsList.length; i++){		
		var fn, action = actionsList[i]
		if (i!=0){
			fn = generateFunc(collection, action.objectType, action.name, user)
		} else {
			fn = generateFirstFunc(collection, action.objectType, action.name, user)
		}		
		list.push(fn)		
	}
	
	return list
	
}


//to be used on items
module.exports.authorizeItems = function (items, user, callback){	
	var waterfallList = generateList(items, user, itemsActions)	
	async.waterfall(waterfallList, callback)	
}


