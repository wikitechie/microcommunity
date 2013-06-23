function attachAction(item, action, value){
	item[action] = value	
}

module.exports = function(wall, user, callback){

	var mc = require('microcommunity')

	if (!user) {
		attachAction(wall, 'canPublish', false)	
		callback(null, wall)
	}			
	else if (wall.wallType == 'user'){
		if (user.id.toString() == wall.owner.oid.toString()){
			attachAction(wall, 'canPublish', true)
			callback(null, wall)					
		} else {
			attachAction(wall, 'canPublish', false)
			callback(null, wall)						
		}

	} else if (wall.wallType == 'material') {
		var Container = mc.model('Container')
		var material = Container.findById(wall.owner.oid, function(err, material){					
			if (material.isMember(user)){		
				attachAction(wall, 'canPublish', true)
				callback(null, wall)		
			} else {
				attachAction(wall, 'canPublish', false)
				callback(null, wall)		
			}
		})		
	} else if (wall.wallType == 'wikipage'){
		var Wikipage = mc.model('Wikipage')
		var Container = mc.model('Container')		
		var wikipage = Wikipage.findById(wall.owner.oid, function(err, wikipage){
			var material = Container.findById(wikipage.container, function(err, material){					
				if (material.isMember(user)){		
					attachAction(wall, 'canPublish', true)
					callback(null, wall)		
				} else {
					attachAction(wall, 'canPublish', false)
					callback(null, wall)							
				}
			})		
		})
	}	
}

