var mongoose = require('mongoose')
	, hasWall = require('./plugins/has-wall')
	, hasStream = require('./plugins/has-stream')

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
userSchema.plugin(hasStream)

module.exports = userSchema



