var microcommunity = require('microcommunity')
	, mongoose = require('mongoose')
	
require('./models/post')
require('./models/photo')	
	
var Stream = mongoose.model('Stream')
	, User = mongoose.model('User')
	, Wall = mongoose.model('Wall')
	, Post = mongoose.model('Post')
	, Photo = mongoose.model('Photo')

var app = module.exports = microcommunity.plugin(__dirname)

//main app
app.get('/', function(req, res){	
	Stream.globalStream(function(err, items){
		console.log(items)
		res.loadPage('home', { items : items })	
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

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
	req.flash('error', 'You should be logged in to view this page')	  
  res.redirect('/login');
}

//api
app.post('/api/walls/:id/items/posts', ensureAuthenticated, function(req, res){
	var post = new Post({
		content : req.body.content,
		author : req.body.author,
		wall : req.body.wall,
	})	
	post.save(function(err){
		res.send(post)
	})
})

//api
app.post('/api/walls/:id/items/photos', ensureAuthenticated, function(req, res){
	var photo = new Photo({
		content : req.body.content,
		author : req.body.author,
		wall : req.body.wall,
	})
	photo.save(function(err){
		Photo.findById(photo.id, function(){
			res.send(photo)						
		})	
	})	
})


