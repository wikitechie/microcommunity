
var express = require('express')
	, mongoose = require('mongoose')
  , fs = require('fs')	
  , path = require('path')

var app = module.exports.test = express();

var rootPath = path.normalize(__dirname + '/../../..')

app.configure(function(){
  app.use('/test', express.static(rootPath + '/core/test/client'));        
})

//providing libraries for client testing
if(app.get('env') == 'test'){

	app.get('/test', function(req, res){
		fs.createReadStream(rootPath + '/core/test/client/runner.html').pipe(res);
	});

	app.get('/sandbox', function(req, res){
		fs.createReadStream(rootPath + '/test/client/sandbox.html').pipe(res);
	});

	app.get('/mocha', function(req, res){
		fs.createReadStream(rootPath + '/node_modules/mocha/mocha.js').pipe(res);
	});
	
	app.get('/chai', function(req, res){
		fs.createReadStream(rootPath + '/node_modules/chai/chai.js').pipe(res);
	});		
}

