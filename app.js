
/**
 * Module dependencies.
 */

var express = require('express')
  , models = require('./models')

//app setup and configuration
var app = express.createServer()

var photosApp = require('./lib/photos')
var postsApp = require('./lib/posts')
var profileApp = require('./lib/profile')
var homeApp = require('./lib/home')
var authenticationApp = require('./lib/authentication')
var registrationApp = require('./lib/registration')
var passport = require('./lib/passport')
var utils = require('./lib/utils')

app.configure(function(){

  //a middleware for rendering pages while passing js data to the client
  app.use(function(req, res, next){
		res.loadPage = function (app, data){
			res.render(app, { 
				server : {
					appName: app,
					data: data || {},
					currentUser: req.user			
				}
			});
		}	
		next()
	})	

	//microcommunity modules
	app.use(passport)
	app.use(homeApp)
	app.use(photosApp)
	app.use(postsApp)	
	app.use(profileApp)
	app.use(authenticationApp)
	app.use(registrationApp)	
	
	
	//express modules
  app.set('port', process.env.PORT || 3000)
  app.set('views', __dirname + '/templates')
  app.set('view engine', 'jade')
  app.use(express.favicon())
  app.use(express.logger('dev')) 
  app.use(app.router)  
  app.use(express.static(__dirname + '/static'))
  app.use('/client', express.static(__dirname + '/client-built'))     
  app.use('/client', express.static(__dirname + '/client'))  
  
  //microcommunity util module 
  app.use(utils.test)
   
})

app.configure('development', function(){
  app.use(express.errorHandler());
})

app = app.listen(3000)

