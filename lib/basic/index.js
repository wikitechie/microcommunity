
var express = require('express')
	, mongoose = require('mongoose')
	, Stream = mongoose.model('Stream')
	, User = mongoose.model('User')
	, Wall = mongoose.model('Wall')
	, Post = mongoose.model('Post')
	, Photo = mongoose.model('Photo')

var app = module.exports = express.createServer();

app.configure(function(){
  app.use('/client', express.static(__dirname + '/client'));      
  app.set('views', __dirname + '/views')
})

//main app
app.get('/', function(req, res){	
	Stream.globalStream(function(err, items){
		res.loadPage('home', { items : items })	
	})	
})

//profile app
app.get('/profiles/:id', function(req, res){	
	var id = req.params.id	
	User.findById(id, function(err, user){
		Wall.loadItems(user.wall, function(err, wall){	
			res.loadPage('profile', {
				user : user, 
				items : wall.items 
			})
		})			
	})	
})

//api
app.post('/api/walls/:id/items/posts', function(req, res){
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
app.post('/api/walls/:id/items/photos', function(req, res){
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

