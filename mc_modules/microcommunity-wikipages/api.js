var mongoose = require('mongoose')
	, User = mongoose.model('User')
	, Post = mongoose.model('Post')
	, Photo = mongoose.model('Photo')
	, Wall = mongoose.model('Wall')
	, Wikipage = mongoose.model('Wikipage')
	, Container = mongoose.model('Container')
	

module.exports = function(app){

	app.post('/api/walls/:wall/wikipage/post', function(req, res){
	
		Wall.findById(req.body.wall, function(err, wall){	
			Wikipage.findById(wall.owner.oid, function(err, wikipage){	
				User.findById(req.body.author, function(err, author){
					var post = new Post({
						content : req.body.content,
						wall : req.body.wall,
						walls : [req.body.wall],
						author : author.id,		
						streams : [author.stream, wikipage.container.stream]
					})	
					post.save(function(err){
						res.send(post)
					})		
				})				
			})		
		})
		
	})

	app.post('/api/publishers/wikipage-wall/photos', function(req, res){
		User.findById(req.body.author, function(err, author){
			var post = new Photo({
				content : req.body.content,
				wall : req.body.wall,
				walls : [req.body.wall],
				author : author.id,		
				streams : [author.stream]
			})	
			post.save(function(err){
				res.send(post)
			})		
		})
	})
	
	app.post('/api/publishers/wiki-wall/posts', function(req, res){
		User.findById(req.body.author, function(err, author){
			var post = new Post({
				content : req.body.content,
				wall : req.body.wall,
				walls : [req.body.wall],
				author : author.id,		
				streams : [author.stream,]
			})	
			post.save(function(err){
				res.send(post)
			})		
		})
	})

	app.post('/api/publishers/wiki-wall/photos', function(req, res){
		User.findById(req.body.author, function(err, author){
			var post = new Photo({
				content : req.body.content,
				wall : req.body.wall,
				walls : [req.body.wall],
				author : author.id,		
				streams : [author.stream]
			})	
			post.save(function(err){
				res.send(post)
			})		
		})
	})	

}
