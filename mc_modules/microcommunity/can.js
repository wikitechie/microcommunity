
var abilities = {
	item : {
		comment : require('./can/item-comment')		
	},
	wall : {
		publish : require('./can/wall-publish')
	}
}


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

//to be used on items
module.exports.authorizeItems = function (items, user, callback){
	authorizeCollection(items, 'item', 'comment', user, callback)
}


