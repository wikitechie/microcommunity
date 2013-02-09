usersController = require('./users')

usersController.create({
	name : 'foobar',
	email: 'asdf@bar.com'
}, function(err, user){
	if(err) { console.log(err); return; }
	console.log(user)
})
