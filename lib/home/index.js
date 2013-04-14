
var express = require('express')
	, mongoose = require('mongoose')
	, Stream = mongoose.model('Stream')

var app = module.exports = express.createServer();

app.configure(function(){
  app.set('views', __dirname + '/views')
})

//main app
app.get('/', function(req, res){	
	Stream.globalStream(function(err, items){
		res.loadPage('home', { items : items })	
	})	
})

