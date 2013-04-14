
var express = require('express')
	, mongoose = require('mongoose')
	, Post = mongoose.model('Post')

var app = module.exports = express.createServer();

app.configure(function(){
  app.use('/client', express.static(__dirname + '/client'));      
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
