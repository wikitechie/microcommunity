
var express = require('express')
	, mongoose = require('mongoose')
	, Stream = mongoose.model('Stream')

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

