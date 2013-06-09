var mongoose = require('mongoose')
	, User = mongoose.model('User')
	, Post = mongoose.model('Post')
	, Photo = mongoose.model('Photo')

module.exports = function(app){

	app.post('/api/publishers/wikipage-wall/posts', function(req, res){
		User.findById(req.body.author, function(err, author){
			var post = new Post({
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
