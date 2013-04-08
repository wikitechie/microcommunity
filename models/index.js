var util = require('util')
	, EventEmitter = require('events').EventEmitter
	, mongoose = require('mongoose')
	, _ = require('underscore')
	

function Models() { 
	this.objectCollectionMatch = {
		'post' : 'posts'
	}
	
	this.objectModelMatch = {
		'post' : 'Post'
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


