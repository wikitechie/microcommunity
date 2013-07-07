var helpers = require('./helpers')

module.exports = function(wall, user, callback){

	var mc = require('microcommunity')

	if (!user) {
		helpers.attachAction(wall, 'canPublish', false)	
		callback(null, wall)	}			
	else if (wall.wallType == 'user'){
		if (user.id.toString() == wall.owner.oid.toString()){
			helpers.attachAction(wall, 'canPublish', true)
			callback(null, wall)					
		} else {
			helpers.attachAction(wall, 'canPublish', false)
			callback(null, wall)						
		}
	} else if (wall.wallType == 'material') {
		helpers.authorizeIfContainerMember(wall.owner.oid, wall, 'canPublish', user, callback)						
	} else if (wall.wallType == 'wikipage'){
		var Wikipage = mc.model('Wikipage')
		var wikipage = Wikipage.findById(wall.owner.oid, function(err, wikipage){
			helpers.authorizeIfContainerMember(wikipage.container, wall, 'canPublish', user, callback)	
		})
	}	else if (wall.wallType == 'homework'){
		var Homework = mc.model('Homework')
		var homework = Homework.findById(wall.owner.oid, function(err, homework){
			helpers.authorizeIfContainerMember(homework.container, wall, 'canPublish', user, callback)	
		})	
	}
}

