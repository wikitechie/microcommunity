var mongoose = require('mongoose')
	, User = mongoose.model('User')
	, Post = mongoose.model('Post')
	, Material = mongoose.model('Material')

module.exports = function(app){
	//semester-wall
	app.post('/api/publishers/materials/:material/posts', function(req, res){
		Material.findById(req.params.material, function(err, material){
			User.findById(req.body.author, function(err, author){
				var post = new Post({
					content : req.body.content,
					wall : req.body.wall,
					walls : [req.body.wall],
					author : author.id,		
					streams : [material.stream]
				})	
				post.save(function(err){
					res.send(post)
				})		
			})		
		})		
	})

	app.post('/api/publishers/materials/:material/photos', function(req, res){
	
		Material.findById(req.params.material, function(err, material){
			User.findById(req.body.author, function(err, author){
			var post = new Photo({
				content : req.body.content,
				wall : req.body.wall,
				walls : [req.body.wall],
				author : author.id,		
				streams : [material.stream]
			})	
			post.save(function(err){
				res.send(post)
			})		
		})
		})

	})
}
