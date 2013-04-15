
var express = require('express')
	, mongoose = require('mongoose')
	, mc = require('./../../../microcommunity')
	, fs = require('fs')
	, models = require('./../../../models')
	, Post = mongoose.model('Post')


var app = module.exports = express.createServer();

app.configure(function(){
  app.use('/client', express.static(__dirname + '/client')) 
})

var items = fs.readdirSync(__dirname + '/client/items')

items.forEach(function(itemType){
	//registerging the item
	mc.addItem('items/' + itemType + '/model', models.objectModelMatch[itemType])
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
