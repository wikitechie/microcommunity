var helpers = require('./helpers')

module.exports = function (item, user, callback){
	var mc = require('microcommunity')

	function commentCallback(err, item){	
		if (item.comments)
			mc.can.authorizeCollection(item.comments, 'comment', 'delete', user, function(err, comments){	
				item.comments = comments
				callback(null, item)
			})
		else 	callback(null, item)
	}


	if (!user){
		helpers.attachAction(item, 'delete', false)
		commentCallback(null, item)
	} else {
		if (mc.site.rootUser == user.email){
			helpers.attachAction(item, 'delete', true)
			commentCallback(null, item)			
		} else if (user.email == item.author.email){
			var isActivity = /^activity:(\w)/
			if (isActivity.test(item.objectType) || item.objectType == 'revision'){
				helpers.attachAction(item, 'delete', false)		
				commentCallback(null, item)				
			} else {
				helpers.attachAction(item, 'delete', true)			
				commentCallback(null, item)			
			}	
		} else {
			helpers.attachAction(item, 'delete', false)
			commentCallback(null, item)		
		}
		
	}
}
