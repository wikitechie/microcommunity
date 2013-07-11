var mongoose = require('mongoose')
	, hasWall = require('./plugins/has-wall')
	, hasStream = require('./plugins/has-stream')

var userSchema = new mongoose.Schema({
	displayName: String,
	password : String,
	email : String,
	openId : String,
	role : String
})

userSchema.statics.findByEmail = function(email, callback){
	this.model('User').findOne({ email : email }, function(err, user){
		callback(err, user)
	})
}

userSchema.pre('save', function(next){
	if (this.isNew){
		var mc = require('microcommunity')
		this.role = mc.site.defaultRole
		next()
	}
})

userSchema.plugin(hasWall, { displayNameAttribute : 'displayName', wallType : 'user' })
userSchema.plugin(hasStream)

module.exports = userSchema



