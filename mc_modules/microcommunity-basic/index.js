var microcommunity = require('microcommunity')
	, mongoose = require('mongoose')
	
require('./models/post')
require('./models/photo')
	
var Stream = mongoose.model('Stream')
	, User = mongoose.model('User')
	, Wall = mongoose.model('Wall')
	, Stream = mongoose.model('Stream')
	, Post = mongoose.model('Post')
	, Photo = mongoose.model('Photo')
	, Container = mongoose.model('Container')
	, auth = microcommunity.auth


var app = module.exports = microcommunity.plugin(__dirname)

//main app
app.get('/', function(req, res){
	Stream.globalStream(function(err, items){
		Container.find({ containerType : 'wiki' }).limit(5).exec(function(err, wikis){
			Container.find({ containerType : 'material' }).limit(5).exec(function(err, materials){
				res.loadPage('home', { 
					wikis : wikis, 
					materials : materials,
					items : items 
				})			
			})	
		})		
	})	
})

//profile app
app.get('/profiles/:id', function(req, res){	
	var id = req.params.id	
	User.findById(id, function(err, user){
		Wall.loadItems(user.wall, function(err, items){	
			res.loadPage('profile', {
				user : user, 
				items : items
			})
		})			
	})	
})

//publisher api
app.post('/api/walls/user/post', function(req, res){	
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

//api
app.post('/api/walls/user/photo', auth.ensureAuthenticated, function(req, res){
	var photo = new Photo({
		content : req.body.content,
		author : req.body.author,
		wall : req.body.wall,
		streams : [req.user.stream]		
	})
	photo.save(function(err){
		Photo.findById(photo.id, function(){
			res.send(photo)						
		})	
	})	
})


