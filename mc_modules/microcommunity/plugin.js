
var express = require('express')
  , items = require('./items')  

module.exports = function(path){

	var app = express()	

	app.configure(function(){	
		var viewsPath = path + '/views'
		var layoutPath = __dirname + '/views'	
		//a middleware for rendering pages while passing js data to the client
		app.use(function(req, res, next){
			res.loadPage = function (appName, data){		
				var serverData = {
					appName: appName,
					data: data || {},
					currentUser: req.user,
					itemModulesInfo : items.exportItemsModulesForClient()
				}
				app.set('views', viewsPath)
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
	
		app.use('/client', express.static(path + '/client'));      
		app.set('views', viewsPath)
	})	
	
	return app

}

