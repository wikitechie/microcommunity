usersController = require('./users')

usersController.create({
	name : 'foobar',
	email: 'foo@bar.com'
}, function(err, user){
	console.log(user)
})
