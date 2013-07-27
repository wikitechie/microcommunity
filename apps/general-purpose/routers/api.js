var microcommunity = require('microcommunity')
	, auth = microcommunity.auth
	, can = microcommunity.can

var express = require('express')
var router = new express.Router()

router.post('/groups', auth.ensureAuthenticated, function(req, res){
	
	var Group = microcommunity.model('Group')

	var container = new Group({
		displayName : req.body.displayName,
		description : req.body.description
	})
				
	container.save(function(err){						
		//making the creator the default admin		
		container.newMembership(req.user)
		container.addRole(req.user, 'mc:admin')	
		container.addRole(req.user, 'mc:member')	
		container.save(function(err){			
			req.user.follow(container)
			req.user.save(function(err){
				res.send(200, container)
			})				
		})						
	})
})

//publisher api
router.post('/walls/:wall/group/post', auth.ensureAuthenticated, function(req, res){	
	var Post = microcommunity.model('Post')
	var User = microcommunity.model('User')
	
	User.findById(req.body.author, function(err, author){
		var post = new Post({
			content : req.body.content,
			wall : req.body.wall,
			walls : [req.body.wall],
			author : author.id,		
			streams : [author.stream]
		})	
		post.save(function(err){
			can.authorize(post.toJSON(), 'item', 'comment', req.user, function(err, post){
				res.send(post)
			})				
		})		
	})
})


module.exports = router
