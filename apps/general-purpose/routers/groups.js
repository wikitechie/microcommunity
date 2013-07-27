var microcommunity = require('microcommunity')
	, auth = microcommunity.auth
	, can = microcommunity.can

var express = require('express')
var router = new express.Router()

function containerMiddleware(req, res, next, id){
	var Container = microcommunity.model('Container')
	Container.findById(id, function(err, container){
		//container.populateRequests(function(err, container){
			req.container = container
			if (req.user){
				var membership = req.container.isMember(req.user)
				if (membership){
					req.containerMembership = membership
				}
			}						
			next()
		//})		
	})
}  

function ContainerSidebar(req, res, next){
	var sidebar = req.container.getSidebar()
	res.sidebars.pushSidebar(sidebar.header, sidebar.links)
	next()
}

router.param('container', containerMiddleware, ContainerSidebar)	

router.get('/', function(req, res){	
	var Group = microcommunity.model('Group') 
	Group.find().sort({ _id : -1 }).exec(function(err, groups){
		res.loadPage('groups/index', { 
			groups : groups
		})
	})	
})

router.get('/:container', function(req, res){
	var Wall = microcommunity.model('Wall')
	Wall.loadItems(req.container.wall, function(err, items){
		can.authorizeItems(items, req.user, function(err, items){
			req.container = req.container.toJSON()		
			can.authorize(req.container.wall, 'wall', 'publish', req.user, function(err, wall){
				res.loadPage('groups/wall', {
					group : req.container,
					items : items
				})		
			})					
		})			
	})
})

module.exports = router
