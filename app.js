
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , fs = require('fs')
  , passport = require('passport')  
  , flash = require('connect-flash')
  , _ = require('underscore')
  , async = require('async')
  , Resource = require('express-resource')
  , mongoose = require('mongoose')
  ;

mongoose.connect('mongodb://localhost/test');

require('./models/user')
require('./models/post')

var Post = mongoose.model('Post')

//setting up passport before app configuration
require('./passport')

//app setup and configuration
var app = express.createServer();

app.configure(function(){

  //a middleware for rendering pages while passing js data to the client
  app.use(function(req, res, next){
		res.loadPage = function (app, data){
			res.render(app, { 
				server : {
					appName: app,
					data: data,
					current_user: req.user			
				}
			});
		}	
		next()
	})     
	
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/templates');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('keyboard cat'));
  app.use(flash());
  app.use(express.session());  
  app.use(passport.initialize());
  app.use(passport.session());  
  app.use(app.router);
  app.use(express.static(__dirname + '/static'));
  app.use('/client', express.static(__dirname + '/client-built'));      
  app.use('/client', express.static(__dirname + '/client'));      
  app.use('/test',express.static(__dirname + '/test/client'));   
  app.use('/shared', express.static(__dirname + '/shared'))  
})

app.configure('development', function(){
  app.use(express.errorHandler());
})

//authentication pages
var auth = require('./routes/auth');
auth.install(app);

//main app
app.get('/', function(req, res){	

	Post.find().limit(5).sort({ _id : -1 }).exec(function(err, results){
		console.log(results)
		res.loadPage('home', {
			wall : { 
				id : '51594b68fdea47a50d000002', 
				owner : '5093489b5c707a300e000001',
				items : results 
			}
		})	
	})
	
	
})

var count = 1
//api
app.post('/api/walls/:id/items', function(req, res){

	var post = new Post({
		content : req.body.content,
		author : req.body.author._id,
		wall : req.body.wall,
		createdAt : Date()		
	})
	
	
	post.save(function(err){	
		res.send(post)				
	})


})


//loading api
//app.resource('api/posts', require('./api/posts'));

//providing libraries for client testing
if(app.get('env') == 'test'){
	app.get('/test', function(req, res){
		fs.createReadStream(__dirname + '/test/client/runner.html').pipe(res);
	});

	app.get('/sandbox', function(req, res){
		fs.createReadStream(__dirname + '/test/client/sandbox.html').pipe(res);
	});

	app.get('/mocha', function(req, res){
		fs.createReadStream(__dirname + '/node_modules/mocha/mocha.js').pipe(res);
	});
	
	app.get('/chai', function(req, res){
		fs.createReadStream(__dirname + '/node_modules/chai/chai.js').pipe(res);
	});		
}



app = app.listen(3000);

