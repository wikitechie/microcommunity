var mongoose = require('mongoose')
	, models = require('./index')
	, hasWall = require('./plugins/haswall')

var userSchema = new mongoose.Schema({
	displayName: String,
	password : String,
	email : String,
	openId : String
})

userSchema.statics.findByEmail = function(email, callback){
	this.model('User').findOne({ email : email }, function(err, user){
		callback(err, user)
	})
}

userSchema.plugin(hasWall, { displayNameAttribute : 'displayName' })

var User = models.define('User', 'user', 'users', userSchema)




