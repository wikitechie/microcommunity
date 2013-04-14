
/**
 * Module dependencies.
 */

var express = require('express')
  , fs = require('fs')
  , mongoose = require('mongoose')
  , models = require('./models')

mongoose.connect('mongodb://localhost/test');

require('./models/user')
require('./models/post')
require('./models/photo')
require('./models/wall')
require('./models/stream')
require('./models/item')

//app setup and configuration
var app = express.createServer();

var photosApp = require('./lib/photos')
var postsApp = require('./lib/posts')
var profileApp = require('./lib/profile')
var homeApp = require('./lib/home')
var authenticationApp = require('./lib/authentication')
var registrationApp = require('./lib/registration')
var passport = require('./lib/passport')


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

	app.use(passport)

	app.use(homeApp)
	app.use(photosApp)
	app.use(postsApp)	
	app.use(profileApp)
	app.use(authenticationApp)
	app.use(registrationApp)	
	
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/templates');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));  
 
  app.use(app.router);
  
  app.use(express.static(__dirname + '/static'));
  //app.use('/client', express.static(__dirname + '/client-built'));      
  app.use('/client', express.static(__dirname + '/client'));      
  app.use('/test',express.static(__dirname + '/test/client'));   
  app.use('/shared', express.static(__dirname + '/shared')) 
   
})

app.configure('development', function(){
  app.use(express.errorHandler());
})

//providing libraries for client testing
if(app.get('env') == 'test'){
	app.get('/test', function(req, res){
		fs.createReadStream(__dirname + '/test/client/runner.html').pipe(res);
	});

	app.get('/sandbox', function(req, res){
		fs.createReadStream(__dirname + '/test/client/sandbox.html').pipe(res);
	});

	app.get('/mocha', function(req, res){
		fs.createReadStream(__dirname + '/node_modules/mocha/mocha.js').pipe(res);
	});
	
	app.get('/chai', function(req, res){
		fs.createReadStream(__dirname + '/node_modules/chai/chai.js').pipe(res);
	});		
}

app = app.listen(3000);

