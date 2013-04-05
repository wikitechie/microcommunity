var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	displayName: String,
	password : String,
	email : String,
	openId : String
})

userSchema.statics.findByEmail = function(email, callback){
	this.model('User').findOne({ email : email }, function(err, user){
		console.log(user)
		callback(err, user)
	})
}


var User = mongoose.model('User', userSchema);

