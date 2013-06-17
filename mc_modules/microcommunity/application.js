
/**
 * Module dependencies.
 */

var express = require('express')

var models = require('./models') 
	, items = require('./items')

function loadPageMiddleware(app, path){

	var viewsPath = path + '/views'
	var layoutPath = __dirname + '/views'	

	return function (req, res, next){
		res.loadPage = function (appName, data, options){		
			var serverData = {
				appName: appName,
				data: data || {},
				currentUser: req.user,
				currentContainer : req.container,
				containerMembership : req.containerMembership,
				itemModulesInfo : items.exportItemsModulesForClient(),
				publishersPaths : items.exportPublishers()
			}
			if (options && options.rootViews) {
				req.app.set('views', layoutPath)
			} else {
				req.app.set('views', viewsPath)
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
	}
}  
  
function containerMiddleware(req, res, next, id){
	var Container = models.getModel('Container')
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
}  
  

function setupPluginInterface(app, path){
	app.use(loadPageMiddleware(app, path))			
	app.use('/client', express.static(path + '/client'))
	app.use(express.static(path + '/static')) 
	app.set('views', path + '/views'	)	
	app.param('container', containerMiddleware)		
}

function useInternalPlugins(app){
	var auth = require('./lib/auth')
	var utils = require('./lib/utils')
	app.use(auth) 
	app.use(utils.test)	
}

function useExpressModules(app){
	app.set('port', process.env.PORT || 3000)
	app.set('view engine', 'jade')
	app.use(express.favicon())
	app.use(express.logger('dev')) 
	app.use(app.router)  
	app.use(express.static(__dirname + '/static'))
	app.use('/client', express.static(__dirname + '/client-built'))     
	app.use('/client', express.static(__dirname + '/client'))
	app.configure('development', function(){
		app.use(express.errorHandler());
	})
}

var application = module.exports = {}

application.initApplication = function(path){

	//internal plugins
	useInternalPlugins(this)
	//plugin interface
	setupPluginInterface(this, path)	
	//express modules	
	useExpressModules(this)
}
  
application.initPlugin = function(path){
	//plugin interface
	setupPluginInterface(this, path)	
}
  
  
