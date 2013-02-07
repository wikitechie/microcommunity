var database = require('./db')
	, container = require('./container')
	
	
var mongodb = require('mongodb')
	, ObjectId = mongodb.ObjectID


database.connect(function(err, db){
	container.setup(db)	
	
	var posts = container.collections.posts
	
	posts.create({ 
		author : ObjectId('5112c06e3e5a312815000001'),
		wall : ObjectId('5112c06e3e5a312815000001'),
		content : "hey!!"
	}, function(err, post){
		posts.findById( post._id.toString() , function(err, post){
			//console.log(post)			
			posts.addComment ( post._id.toString(), 
				{ 
					author : ObjectId('5112c06e3e5a312815000001'), 
					text : 'haha!' 
				}, function(err){
				
				posts.addJoke ( post._id.toString(), 
					{ 
						author : ObjectId('5112c06e3e5a312815000001'), 
						text : 'this is a real joke!!!! :D' 
					}, function(err){
					
						posts.findById( post._id.toString() , function(err, post){
							console.log(post)
						})											
					})											
			})
		})		
	})
	
})
