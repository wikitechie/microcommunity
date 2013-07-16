
var abilities = {}

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

module.exports.define = function(objectType, action, func){
	if (!abilities[objectType]) abilities[objectType] = {}
	abilities[objectType][action] = func
}

exports.define('item', 'comment', require('./can/item-comment'))
exports.define('item', 'delete', require('./can/item-delete'))
exports.define('wall', 'publish', require('./can/wall-publish'))
exports.define('comment', 'delete', require('./can/comment-delete'))


module.exports.helpers = require('./can/helpers')

//to be used on items
module.exports.authorizeItems = function (items, user, callback){
	authorizeCollection(items, 'item', 'comment', user, function(err, items){
		authorizeCollection(items, 'question', 'answer', user, function(err, items){
			authorizeCollection(items, 'item', 'delete', user, callback)			
		})	
	})
}


