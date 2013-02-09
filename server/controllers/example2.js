usersController = require('./users')
postsController = require('./posts')

usersController.findById('51163fccd64c81320f000001', function(err, user){
	if(err) { console.log(err); return; }

	author_id = user._id.toString()	
	wall_id = user.wall.toString()
	
	postsController.create(
		'Hello, World!',
		'51163fccd64c81320f000001',
		wall_id
	, function(err, wallItem){
		if(err) { console.log(err); return; }
		console.log('wallItem')
		console.log(wallItem)				
		usersController.fetchWall('51163fccd64c81320f000001', function(err, wall){
			//console.log('user wall')
			//console.log(wall)
		})
	
	})	
	
})
