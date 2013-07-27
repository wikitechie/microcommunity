var helpers = require('./helpers')

module.exports = function (item, user, callback){
	var mc = require('microcommunity')
	
	function process(){
		if ( item.wall.owner.namespace == 'containers' ){		
			helpers.authorizeIfContainerMember(item.wall.owner.oid, item, 'comment', user, callback)
		} else if (wallType === "wikipage") {
			var Wikipage = mc.model('Wikipage')
			var wikipage = Wikipage.findById(item.wall.owner.oid, function(err, wikipage){
				helpers.authorizeIfContainerMember(wikipage.container, item, 'comment', user, callback)
			})				
		} else {
			helpers.attachAction(item, 'comment', true)
			callback(null, item)		
		}	
	}
	
	
	var wallType = false
	if (item.wall) wallType = item.wall.wallType
	if (!user){
		helpers.attachAction(item, 'comment', false)
		callback(null, item)
	} else {
	
		if (!wallType){		
			item.populate('wall', function(err, item){
				process()			
			})		
		} else {
			process()
		}
	}
	
}
