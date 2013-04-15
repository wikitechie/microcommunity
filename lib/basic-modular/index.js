
var express = require('express')
	, mongoose = require('mongoose')
	, Stream = mongoose.model('Stream')

var app = module.exports = express.createServer();

var photosApp = require('./photos')
var postsApp = require('./posts')
var profileApp = require('./profile')
var homeApp = require('./home')

app.configure(function(){
	app.use(homeApp)
	app.use(photosApp)
	app.use(postsApp)	
	app.use(profileApp)
})

