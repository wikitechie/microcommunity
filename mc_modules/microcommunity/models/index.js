var util = require('util')
	, EventEmitter = require('events').EventEmitter
	, mongoose = require('mongoose')
	, _ = require('underscore')
	

function Models() { 
	this.objectCollectionMatch = {
		'post' : 'posts',
		'photo' : 'photos',
		'user' : 'users'
	}
	
	this.objectModelMatch = {
		'post' : 'Post',
		'photo' : 'Photo',
		'user' : 'User'
	}
	
	this.modelObjectMatch = {
		'Post' : 'post',
		'Photo' : 'photo',
		'User' : 'user'
	}
	
	this.collectionModelMatch = {
		'posts' : 'Post',
		'users' : 'User',
		'photos' : 'Photo',
		'users' : 'User'
	}		
}

util.inherits(Models, EventEmitter)

var models = new Models()

module.exports = models

mongoose.connect('mongodb://localhost/test')

require('./user')
require('./post')
require('./photo')
require('./wall')
require('./stream')
require('./item')





