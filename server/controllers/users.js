var db = require('./../db')

/*
	users controller
*/

exports.create = function(attr, callback){
	db.getCollection('users').create(attr, function(err, user){
		if (!err){
			db.getCollection('walls').create({}, function(err, wall){
				if (!err){
					db.getCollection('users').updateAttr( 
						user._id.toString(), 'wall', user._id.toString(),
						function(err){
							db.getCollection('users').findById(user._id.toString(), function(err, user){
								console.log('user created successfully')
								console.log(user)
							})
						})				
				}
			})
		}
	})	
}
