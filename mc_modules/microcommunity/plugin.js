
var express = require('express')
  , models = require('./models')  

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
					itemModulesInfo : models.items.exportItemsModulesForClient(),
					publishersPaths : models.items.exportPublishers()
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
		app.use(express.static(path + '/static'))    
		app.set('views', viewsPath)
	})	
	
	return app

}

