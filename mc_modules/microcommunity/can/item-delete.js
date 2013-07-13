var helpers = require('./helpers')

module.exports = function (item, user, callback){
	var mc = require('microcommunity')

	if (!user){
		helpers.attachAction(item, 'delete', false)
		callback(null, item)
	} else {
		if (mc.site.rootUser == user.email){
			helpers.attachAction(item, 'delete', true)
			callback(null, item)			
		} else if (user.email == item.author.email){
			var isActivity = /^activity:(\w)/
			if (isActivity.test(item.objectType) || item.objectType == 'revision'){
				helpers.attachAction(item, 'delete', false)		
				callback(null, item)				
			} else {
				helpers.attachAction(item, 'delete', true)			
				callback(null, item)			
			}	
		} else {
			helpers.attachAction(item, 'delete', false)
			callback(null, item)		
		}
		
	}
}
