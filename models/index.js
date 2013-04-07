var util = require('util')
	, EventEmitter = require('events').EventEmitter
	, mongoose = require('mongoose')
	
function Models() { 

}

util.inherits(Models, EventEmitter)


var models = new Models()

models.on('user:new', function(user){
	var owner = new mongoose.Types.DBRef('users', user._id)
		
	console.log(user)
	mongoose.model('Wall').findByIdAndUpdate(user.wall, { $set : { owner : owner } }, function(err, wall){
		console.log(err)
		console.log(wall)
	})
})

module.exports = models


