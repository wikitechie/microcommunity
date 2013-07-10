module.exports.attachAction = function(item, action, value){
	item[action] = value	
}

module.exports.authorizeIfContainerMember = function (container, item, action, user, callback){
	var mc = require('microcommunity')
	var Container = mc.model('Container')
	
	Container.findById(container, function(err, container){					
		if (container.isMember(user)){		
			exports.attachAction(item, action, true)
			callback(null, item)			
		} else {
			exports.attachAction(item, action, false)
			callback(null, item)							
		}
	})	
}

