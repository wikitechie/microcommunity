
/**
 * Module dependencies.
 */

var express = require('express')
	, fs = require('fs');
	
var models = require('./models') 
	, items = require('./items')
	, sidebars = require('./sidebars')

function loadPageMiddleware(app, path){

	var viewsPath = path + '/views'
	var layoutPath = __dirname + '/views'	

	return function (req, res, next){
	
		function hasRole(role){
			if (!server.currentUser) return false			
			if (server.currentUser.role == role) return true
			else return false	
		}		
	
		res.loadPage = function (appName, data, options){
			var serverData = {
				site : app.get('site'),
				appName: appName,
				data: data || {},
				currentUser: req.user,
				currentContainer : req.container,
				containerMembership : req.containerMembership,
				itemModulesInfo : items.exportItemsModulesForClient(),
				sidebars : res.sidebars.getSidebars()
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
		container.populateRequests(function(err, container){
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
}  

function ContainerSidebar(req, res, next){
	var sidebar = req.container.getSidebar()
	res.sidebars.pushSidebar(sidebar.header, sidebar.links)
	next()
}
	
function globalSidebarCallback(req, res, next){
	res.sidebars.pushSidebar('Everything', sidebars.getGlobalSidebar())
	next()
}

function setupPluginInterface(app, path){

	app.use(loadPageMiddleware(app, path))	
	app.use('/client', express.static(path + '/client-built'))     			
	app.use('/client', express.static(path + '/client'))
	app.use(express.static(path + '/static')) 
	app.set('views', path + '/views'	)	
	app.param('container', containerMiddleware, ContainerSidebar)	
	app.use(function(req, res, next){
		var Sidebars = require('./sidebars')
		res.sidebars = new Sidebars()
		next()
	})
	app.use(globalSidebarCallback)	
}

function useInternalPlugins(app, path){
	var auth = require('./lib/auth')
	var utils = require('./lib/utils')
	var root = require('./lib/root')
	app.use(auth) 
	app.use(utils.test)	
	app.use(root)
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

application.containerMiddleware  = containerMiddleware

application.initApplication = function(path){

	//getting site info
	var file = path + '/site.json'			 
	var data = fs.readFileSync(file, 'utf8')
	console.log('Loaded site data')
	data = JSON.parse(data)			 
	console.dir(data)
	this.set('site', data)

	//internal plugins
	useInternalPlugins(this, path)
	//plugin interface
	setupPluginInterface(this, path)
	//express modules	
	useExpressModules(this)
	
	return data
}
  
application.initPlugin = function(path){
	//plugin interface
	setupPluginInterface(this, path)	
}  
  
