var helpers = require('./helpers')

module.exports = function (comment, user, callback){
	var mc = require('microcommunity')

	if (!user){
		helpers.attachAction(comment, 'delete', false)
		callback(null, comment)
	} else {
		if (mc.site.rootUser == user.email){
			helpers.attachAction(comment, 'delete', true)
			callback(null, comment)			
		} else if (user.email == comment.author.email){			
			helpers.attachAction(comment, 'delete', true)			
			callback(null, comment)			
		} else {
			helpers.attachAction(comment, 'delete', false)
			callback(null, comment)		
		}		
	}
}
