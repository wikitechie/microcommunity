var microcommunity = require('microcommunity')
	, Container = microcommunity.model('Container')

var sidebar = microcommunity.sidebars.getDefault()
sidebar.push({label : 'Browse Materials', url : '/materials', icon : 'icon-camera-retro' })	

exports.default = function (req, res, next){
	res.sidebars.pushSidebar('Everything', sidebar)
	next()
}

exports.materials = function (req, res, next){
	var query = { 
		containerType : 'material'
	}
	if (req.user) query['memberships.user'] = req.user.id
	
	Container.find(query).limit(5).exec(function(err, materials){	
		var links = []
		for(var i=0; i<materials.length; i++){
			var material = materials[i]
			var link = { label : material.displayName , url : '/materials/'+material.id }
			links.push(link)
		}		
		res.sidebars.pushSidebar("Materials", links)
		next()	
	})
}	
