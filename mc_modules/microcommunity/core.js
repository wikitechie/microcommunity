
/**
 * Module dependencies.
 */

var express = require('express')
  
module.exports = function(){ 
	//app setup and configuration
	var app = express()

	var auth = require('./lib/auth')
	var utils = require('./lib/utils')

	//microcommunity modules
	app.use(auth) //should be used first

	//microcommunity util module 
	app.use(utils.test)	

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

	app.configure('development', function(){
		app.use(express.errorHandler());
	})
	
	return app

}  
 

