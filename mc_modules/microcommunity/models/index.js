var util = require('util')
	, EventEmitter = require('events').EventEmitter
	, mongoose = require('mongoose')
	, _ = require('underscore')
	

function Models() { 
	this.objectCollectionMatch = {
		'post' : 'posts',
		'photo' : 'photos',
		'user' : 'users',
		'wikipage' : 'wikipages',
		'activity' : 'activities'
	}
	
	this.objectModelMatch = {
		'post' : 'Post',
		'photo' : 'Photo',
		'user' : 'User',
		'wikipage' : 'Wikipage',
		'activity' : 'Activity'		
	}
	
	this.modelObjectMatch = {
		'Post' : 'post',
		'Photo' : 'photo',
		'User' : 'user',
		'Wikipage' : 'wikipage',
		'Activity' : 'activity'		
	}
	
	this.collectionModelMatch = {
		'posts' : 'Post',
		'users' : 'User',
		'photos' : 'Photo',
		'users' : 'User',
		'wikipages' : 'Wikipage',
		'activities' : 'Activity'
	}		
}

util.inherits(Models, EventEmitter)

var models = new Models()

module.exports = models

mongoose.connect('mongodb://localhost/test')

require('./item')
require('./post')
require('./photo')

require('./wall')
require('./user')
require('./wikipage')

require('./activity')
require('./stream')







