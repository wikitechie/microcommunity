var database = require('./db')
	, container = require('./container')
	
	
var mongodb = require('mongodb')
	, ObjectId = mongodb.ObjectID


database.connect(function(err, db){
	container.setup(db)	
	
	container.collections.posts.create({ 
		author : ObjectId('5112c06e3e5a312815000001'),
		wall : ObjectId('5112c06e3e5a312815000001'),
		content : "hey!!"
	}, function(err, post){
		container.collections.posts.findById( post._id.toString() , function(err, post){
			console.log(post)
		})		
	})
	
})
