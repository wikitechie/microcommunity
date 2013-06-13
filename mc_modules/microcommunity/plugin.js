
var express = require('express')
  , models = require('./models')  
  , mongoose = require('mongoose')
  , Container = mongoose.model('Container')

module.exports = function(path){

	var app = express()	
	
	var viewsPath = path + '/views'
	var layoutPath = __dirname + '/views'		
	
	app.configure(function(){	

		//a middleware for rendering pages while passing js data to the client
		app.use(function(req, res, next){
			res.loadPage = function (appName, data, options){		
				var serverData = {
					appName: appName,
					data: data || {},
					currentUser: req.user,
					currentContainer : req.container,
					containerMembership : req.containerMembership,
					itemModulesInfo : models.items.exportItemsModulesForClient(),
					publishersPaths : models.items.exportPublishers()
				}
				if (options && options.rootViews) {
					app.set('views', layoutPath)
				} else {
					app.set('views', viewsPath)
				}				
				res.render(appName, { server : serverData }, function(err, html){
					if (err) {
						next(err)
					} else {
						app.set('views', layoutPath)	
						res.render('layout', { 
							content : html,
							server : serverData
						})
					}								
				})			
			}	
			next()
		})
		
		//a middleware for switching between root and modules view paths
		
		app.use('/client', express.static(path + '/client'));  
		app.use(express.static(path + '/static'))    
		app.set('views', layoutPath)
	})
	
	app.container = function(path, modelName, viewsPath, homePage){

		if(!homePage) throw new Error('You should provide container homepage callback')
		
		var mongoose = require('mongoose')
		var Model = mongoose.model(modelName)
		
		var ContainerRoutes = require('./container')	
		var containerRoutes = new ContainerRoutes(Model, viewsPath)	

	
		//index and create paths
		app.post(path, containerRoutes.create)
		app.get(path, containerRoutes.index)	
	
		//homepage of a container
		app.get(path + '/:id', homePage)	

		//stream and wall paths
		app.get(path + '/:id/wall', containerRoutes.wall)
		app.get(path + '/:id/stream', containerRoutes.stream)	
		
	}
	
	app.param('container', function(req, res, next, id){
		Container.findById(id, function(err, container){
			req.container = container
			if (req.user){
				var membership = req.container.isMember(req.user)
				if (membership){
					req.containerMembership = membership
				}
			}						
			next()
		})
	})	

	
		
	
	return app

}

