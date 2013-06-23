var mongoose = require('mongoose')
	, User = mongoose.model('User')
	, Post = mongoose.model('Post')
	, Material = mongoose.model('Material')
	, models = require('microcommunity/models')
	, auth = require('microcommunity').auth		

module.exports = function(app){

	/*var user = require('connect-roles')
	user.use('add a section', function(req){
		if (!req.user) 
			return false		
		else if (req.material.hasRole(req.user, 'admin'))
			return true		
		else 
			return false
	})*/

	app.post('/api/materials/:id/sections', /*fetchMaterial, user.can('add a section'),*/ function(req, res){
		var section = req.body
		Material.findByIdAndUpdate(req.params.id, { $push : { sections : section } }, function(err, material){	
			res.send(200, section)
		})
	})
	
	app.post('/api/materials/:container/memberships', auth.ensureAuthenticated, function(req, res){
		if (!req.container.isMember(req.user)){
			req.container.newMembership(req.user)
		}			
		req.container.addRole(req.user, 'mc:member')	
		req.container.save(function(err){				
			res.send(200, req.container)	
		})
	})
	
	app.delete('/api/materials/:container/memberships/:membership', 
		auth.ensureAuthenticated,
		auth.ensureContainerMember(), 
		function(req, res){
			//TODO implement memebership removal
			req.container.save(function(err){				
				res.send(200, req.container)	
			})
	})

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
	app.post('/api/walls/material/post', function(req, res){
		User.findById(req.body.author, function(err, author){
			var post = new Post({
				content : req.body.content,
				wall : req.body.wall,
				walls : [req.body.wall],
				author : author.id,		
				//streams : [req.container.stream]
			})	
			post.save(function(err){
				res.send(post)
			})		
		})		
	})

	app.post('/api/walls/material/photo', function(req, res){	
			User.findById(req.body.author, function(err, author){
			var post = new Photo({
				content : req.body.content,
				wall : req.body.wall,
				walls : [req.body.wall],
				author : author.id,		
				//streams : [req.container.stream]
			})	
			post.save(function(err){
				res.send(post)
			})		
		})

	})
}
