var microcommunity = require('microcommunity')
	, mongoose = require('mongoose')
	
require('./models/post')
require('./models/photo')
	
var Stream = mongoose.model('Stream')
	, User = mongoose.model('User')
	, Wall = mongoose.model('Wall')
	, Stream = mongoose.model('Stream')
	, Item = mongoose.model('Item')
	, Post = mongoose.model('Post')
	, Photo = mongoose.model('Photo')
	, Container = mongoose.model('Container')
	, auth = microcommunity.auth
	, can = microcommunity.can
	, sidebars = microcommunity.sidebars


module.exports = function(){

	var app = microcommunity.createPlugin({ path : __dirname })
	

	/*function someMaterialsSidebar(req, res, next){
		var query = { 
			containerType : 'material'
		}
		if (req.user) query['memberships.user'] = req.user.id
		
		Container.find(query).limit(5).exec(function(err, materials){	
			var links = []
			for(var i=0; i<materials.length; i++){
				var material = materials[i]
				var link = { label : material.displayName , url : '/materials/'+material.id }
				links.push(link)
			}		
			res.sidebars.pushSidebar("Materials", links)
			next()	
		})
	}*/
	
	//main app
	app.get('/', /*someMaterialsSidebar,*/ function(req, res){
	
		if (!req.user){
			res.sidebars.disable()
			res.loadPage('welcome')		
		} else {
		
			req.user.loadFeed(function(err, items){
			//Stream.globalStream(function(err, items){	
				can.authorizeItems(items, req.user, function(err, items){
					if (req.user){
						var currentUser = req.user //just a small hack
						req.user = req.user.toJSON()
						can.authorize(req.user.wall, 'wall', 'publish', currentUser, function(err, wall){
							res.loadPage('home', { 
								items : items 
							})				
						})				
					} else {
						res.loadPage('home', { 
							items : items 
						})			
					}			
				})				
			})		
		}	
	})
	
	app.get('/stream', /*someMaterialsSidebar,*/ function(req, res){
		Stream.globalStream(function(err, items){	
			can.authorizeItems(items, req.user, function(err, items){
				if (req.user){
					var currentUser = req.user //just a small hack
					req.user = req.user.toJSON()
					can.authorize(req.user.wall, 'wall', 'publish', currentUser, function(err, wall){
						res.loadPage('home', { 
							items : items 
						})				
					})				
				} else {
					res.loadPage('home', { 
						items : items 
					})			
				}			
			})				
		})		
	})
	
	app.get('/api/streams/:stream', function(req, res){	
		var base = req.query.base ? req.query.base : 0				
		var page = req.query.page ? req.query.page : 0
		var pageSize = req.query.pageSize ? req.query.pageSize : 4	
		
		if (req.params.stream === 'global'){
			Stream.globalStream(base, page, pageSize, function(err, items){
				can.authorizeItems(items, req.user, function(err, items){
					res.send(items)
				})				
			})			
		} else {
			Stream.loadItems(req.params.stream, base, page, pageSize, function(err, items){
				can.authorizeItems(items, req.user, function(err, items){
					res.send(items)
				})
			})	
		}				
	})	
	
	app.get('/api/walls/:wall/:wallType', function(req, res){	
		var base = req.query.base ? req.query.base : 0				
		var page = req.query.page ? req.query.page : 0
		var pageSize = req.query.pageSize ? req.query.pageSize : 4	

		Wall.loadItems(req.params.wall, base, page, pageSize, function(err, items){
			can.authorizeItems(items, req.user, function(err, items){
				res.send(items)
			})
		})				
	})	
	

	//profile app
	app.get('/profiles/:id', /*someMaterialsSidebar,*/ function(req, res){	
		var id = req.params.id	
		User.findById(id, function(err, user){
			Wall.loadItems(user.wall, function(err, items){	
				can.authorizeItems(items, req.user, function(err, items){				
					var authorizedUser = user.toJSON()		
					can.authorize(authorizedUser.wall, 'wall', 'publish', req.user, function(err, wall){
						res.loadPage('profile', {
							user : authorizedUser, 
							items : items
						})			
					})
				})							
			})			
		})	
	})
	
	app.post('/users/:id/follow', function(req, res){
		User.findById(req.params.id, function(err, user){
			req.user.follow(user)
			req.user.save(function(err){
				res.redirect('back')			
			})
		})
	})

	//publisher api
	app.post('/api/walls/:wall/user/post', function(req, res){	
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
	
	app.delete(/^\/api\/walls\/(\w+)\/(\w+)\/(\w+)\/(\w+)/, function(req, res){
		Item.findById(req.params[3], function(err, item){
			item.remove(function(err){
				if (!err)
					res.send(200, {})
				else
					res.send(500)
			})
		})
	})	

	//api
	app.post('/api/walls/:wall/user/photo', auth.ensureAuthenticated, function(req, res){
		var photo = new Photo({
			content : req.body.content,
			filePath : req.body.filePath,
			author : req.body.author,
			wall : req.body.wall,
			streams : [req.user.stream]		
		})
		
		photo.save(function(err){
			res.send(photo)
		})	
	})
	
	function fetchItem(req, res, next){
		var Item = microcommunity.model('Item')
		Item.findById(req.params.item, function(err, item){	
			req.item = item
			next()
		})		
	}	
	
	var middleware = can.authorizeMiddlewareAPI('item', 'comment')
	
	app.post('/api/items/:item/comments', function(req, res){	
		var comment = req.body
		comment.published = Date()
				
		var Post = microcommunity.model('Post')
		var update = { $push : { comments : comment } }
		var options = { select : 'comments' }
		Post.findByIdAndUpdate(req.params.item, update, options, function(err, object){
			var l = object.comments.length
			var comment = object.comments[l-1]
			can.authorize(comment, 'comment', 'delete', req.user, function(err, comment){
				res.send(comment)
			})		
			
		})		
	})
	
	app.delete('/api/items/:item/comments/:comment', function(req, res){				
		var Post = microcommunity.model('Post')
		Post.findById(req.params.item, function(err, item){
			item.comments.remove({ _id : req.params.comment})
			item.save(function(err){
				res.send(200, {})
			})		
		})		
	})	
	
	
	app.post('/api/fileupload', function(req, res){
		var isImage = /^image/
		if (isImage.test(req.files.file.type)){
			microcommunity.files.saveFile(req.files.file, '/photos/', function(filePath){
				res.send({ files : [
					{
						url : filePath
					}
			
				]})
			})		
		} else {
			res.send(500)
		}	

	})
	
	
	return app
}

