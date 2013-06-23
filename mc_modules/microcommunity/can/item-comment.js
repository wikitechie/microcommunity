var helpers = require('./helpers')

module.exports = function (item, user, callback){
	var mc = require('microcommunity')
	var wallType = item.wall.wallType
		
	if (!user){
		helpers.attachAction(item, 'canComment', false)
		callback(null, item)
	} else if (wallType === "material"){		
		helpers.authorizeIfContainerMember(item.wall.owner.oid, item, 'canComment', user, callback)
	
	} else if (wallType === "wikipage") {
		var Wikipage = mc.model('Wikipage')
		var wikipage = Wikipage.findById(item.wall.owner.oid, function(err, wikipage){
			helpers.authorizeIfContainerMember(wikipage.container, item, 'canComment', user, callback)
		})				
	} else {
		helpers.	attachAction(item, 'canComment', true)
		callback(null, item)		
	}	
}
