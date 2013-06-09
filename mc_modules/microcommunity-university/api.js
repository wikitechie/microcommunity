var mongoose = require('mongoose')
	, User = mongoose.model('User')
	, Post = mongoose.model('Post')
	, Material = mongoose.model('Material')
	, models = require('microcommunity/models')

module.exports = function(app){

	//adding a new section
	app.post('/api/materials/:material/sections/:section/attachements', function(req, res){	

		var attachement = req.body
		var objectType = models.convert(req.body.object.type, 'object', 'collection')
		var objectId = req.body.object.id
		attachement.object = new mongoose.Types.DBRef(objectType, objectId)
	
		var section = req.params.section
	
		var sectionIndex = 'sections.' + section + '.attachements'
	
		var update = {}
		update[sectionIndex] = attachement
		
		Material.findByIdAndUpdate(
			req.params.material,
			{ $push : update }, 
			function(err, material){
				res.send(200, attachement)
		})
	
	})


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
