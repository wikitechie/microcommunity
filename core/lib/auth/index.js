var express = require('express')

var app = module.exports = express.createServer()

var authenticationApp = require('./authentication')
var registrationApp = require('./registration')
var passport = require('./passport')

app.configure(function(){
	app.use(passport)
	app.use(authenticationApp)
	app.use(registrationApp)	

})

