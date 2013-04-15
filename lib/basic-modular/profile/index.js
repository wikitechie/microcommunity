
var express = require('express')
	, mongoose = require('mongoose')
	, User = mongoose.model('User')
	, Wall = mongoose.model('Wall')

var app = module.exports = express.createServer()

app.configure(function(){
  app.use('/client', express.static(__dirname + '/client'));      
  app.set('views', __dirname + '/views')
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

