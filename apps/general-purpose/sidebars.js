var microcommunity = require('microcommunity')
	, sidebars = microcommunity.sidebars
	, Container = microcommunity.model('Container')

var sidebar = sidebars.getDefault()
sidebar.push({ label : 'Groups', url : '/groups', icon : 'icon-group'  })

exports.default = function (req, res, next){
	res.sidebars.pushSidebar('Everything', sidebar)
	next()
}

exports.groups = function (req, res, next){
	var query = { 
		containerType : 'group'
	}
	//if (req.user) query['memberships.user'] = req.user.id
	
	Container.find(query).sort({ _id : -1 }).limit(8).exec(function(err, groups){	
		var links = []
		for(var i=0; i<groups.length; i++){
			var group = groups[i]
			var link = { label : group.displayName , url : '/groups/'+ group.id }
			links.push(link)
		}		
		res.sidebars.pushSidebar("Groups", links)
		next()	
	})
}	
