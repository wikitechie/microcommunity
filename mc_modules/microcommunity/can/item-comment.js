function attachAction(item, action, value){
	item[action] = value	
}

module.exports = function (item, user, callback){

	var mc = require('microcommunity')
	
	var Container = mc.model('Container')
	, Wikipage = mc.model('Wikipage')
	, wallType = item.wall.wallType
		
	if (!user){
		attachAction(item, 'canComment', false)
		callback(null, item)
	} else if (wallType === "material"){			
		var material = Container.findById(item.wall.owner.oid, function(err, material){					
			if (material.isMember(user)){		
				attachAction(item, 'canComment', true)
				callback(null, item)			
			} else {
				attachAction(item, 'canComment', false)
				callback(null, item)							
			}
		})		
	} else if (wallType === "wikipage") {
		var wikipage = Wikipage.findById(item.wall.owner.oid, function(err, wikipage){
			var material = Container.findById(wikipage.container, function(err, material){
				if (material.isMember(user)){		
					attachAction(item, 'canComment', true)
					callback(null, item)								
				} else {
					attachAction(item, 'canComment', false)
					callback(null, item)								
				}

				})
		})				
	} else {
		attachAction(item, 'canComment', true)
		callback(null, item)		
	}
	
}
