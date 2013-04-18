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
		'activity:new-wikipage' : 'newwikipageactivities'
	}
	
	this.objectModelMatch = {
		'post' : 'Post',
		'photo' : 'Photo',
		'user' : 'User',
		'wikipage' : 'Wikipage',
		'activity:new-wikipage' : 'NewWikipageActivity'		
	}
	
	this.modelObjectMatch = {
		'Post' : 'post',
		'Photo' : 'photo',
		'User' : 'user',
		'Wikipage' : 'wikipage',
		'NewWikipageActivity' : 'activity:new-wikipage'		
	}
	
	this.collectionModelMatch = {
		'posts' : 'Post',
		'users' : 'User',
		'photos' : 'Photo',
		'users' : 'User',
		'wikipages' : 'Wikipage',
		'newwikipageactivities' : 'NewWikipageActivity'
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

require('./activity')
require('./stream')







