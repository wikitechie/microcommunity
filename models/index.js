var util = require('util')
	, EventEmitter = require('events').EventEmitter
	, mongoose = require('mongoose')
	, _ = require('underscore')
	

function Models() { 
	this.objectCollectionMatch = {
		'post' : 'posts',
		'photo' : 'photos'
	}
	
	this.objectModelMatch = {
		'post' : 'Post',
		'photo' : 'Photo'
	}
	
	this.collectionModelMatch = {
		'posts' : 'Post',
		'users' : 'User',
		'photos' : 'Photo'
	}	
			
}

util.inherits(Models, EventEmitter)

var models = new Models()

models.on('user:new', function(user){
	var owner = new mongoose.Types.DBRef('users', user._id)
	mongoose.model('Wall').findByIdAndUpdate(user.wall, { $set : { owner : owner } }, function(err, wall){
	})
})


module.exports = models


