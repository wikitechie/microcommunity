var mongoose = require('mongoose')
	, models = require('./index')

var userSchema = new mongoose.Schema({
	displayName: String,
	password : String,
	email : String,
	openId : String,
	wall : { type : mongoose.Schema.Types.ObjectId, ref: 'Wall'} ,
	_wall : mongoose.Schema.Types.Mixed
})

userSchema.statics.findByEmail = function(email, callback){
	this.model('User').findOne({ email : email }, function(err, user){
		callback(err, user)
	})
}

//populating options
userSchema.pre('init', function(next, doc){	
	var Wall = mongoose.model('Wall')
	Wall.populate(doc, 'wall', function(err, doc){
		next(err, doc)
	})
})	

//creating a wall object for each user
userSchema.pre('save', function(next){
	var Wall = mongoose.model('Wall')
	var wall = new Wall({ displayName : this.displayName })
	var self = this
	wall.save(function(err, wall){
		if (!err){
			self.wall = wall._id
			next(null)
		} else {
			next(new Error('Could not create wall object'))
		}
	})
})

userSchema.post('save', function(doc){
	models.emit('user:new', doc)
})


var User = mongoose.model('User', userSchema);




