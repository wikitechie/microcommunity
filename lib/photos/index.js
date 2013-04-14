
var express = require('express')
	, mongoose = require('mongoose')
	, Photo = mongoose.model('Photo')

var app = module.exports = express.createServer();

app.use(express.bodyParser());

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

