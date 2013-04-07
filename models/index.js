var util = require('util')
	, EventEmitter = require('events').EventEmitter
	, mongoose = require('mongoose')
	
function Models() { 

}

util.inherits(Models, EventEmitter)


var models = new Models()

models.on('user:new', function(user){
	var owner = new mongoose.Types.DBRef('users', user._id)
	mongoose.model('Wall').findByIdAndUpdate(user.wall, { $set : { owner : owner } }, function(err, wall){
	})
})

models.on('post:new', function(post){
	var object = new mongoose.Types.DBRef('posts', post._id)
	mongoose.model('Item').findByIdAndUpdate(post.item, { $set : { object : object } }, function(err, item){
	})
})

module.exports = models


