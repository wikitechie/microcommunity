
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
  , LocalStrategy = require('passport-local').Strategy
  , async = require('async')
  , Resource = require('express-resource')
  , activities_provider = require('./providers/activities-provider')
  , users_provider = require('./providers/users-provider')  
  , follows_provider = require('./providers/follows-provider')    
  , database = require('./providers/db')
  , comments_api = require('./api/comments')
  , votes_api = require('./api/votes')  
  ;



var db;
database.connectDB(function(err, database){
	db = database;
	activities_provider.setup(database);
	users_provider.setup(database);	
	follows_provider.setup(database);		
	comments_api.setup(database)
	votes_api.setup(database)	
	console.log( 'Connection to database established...')
});


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	users_provider.fetch(id, function(err, user) {
		done(err, user);
  });
});

// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
	function(email, password, done) {
  // asynchronous verification, for effect...
		process.nextTick(function () {         
			users_provider.fetchByEmail(email, function(err, user){
				if (err) { return done(err); }
				if (!user) { return done(null, false, { message: 'Unknown email ' + email }); }
				if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
			return done(null, user);
  	})
	});    	
}));



var app = express.createServer();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
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
  app.use(express.static(__dirname + '/public')); 
  app.use(express.static(__dirname + '/test/client'));   
  
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.resource('api/posts', require('./api/posts'));
app.resource('api/:collection/:id/comments', comments_api);    
app.resource('api/wikipages', require('./api/wikipages'));
app.resource('api/activities', require('./api/activities'));        
app.resource('api/:collection/:id/:type/votes', votes_api);        

//authentication pages
var auth = require('./routes/auth');
auth.install(app, db);

//main app
app.get('/', function(req, res){
	activities_provider.fetchActivities(0,5,function(err, activities){	
		res.render('index', { activities: activities, current_user: req.user});
	});
});

app.get('/profile/:id', function(req, res){
	
	users_provider.fetch( req.params.id, function(err, user){
		activities_provider.fetchUserActivities(req.params.id, 0,5,function(err, activities){	
			console.log (user)
			res.render('profile', { 
				activities: activities, 
				profile: user.profile, 
				user: user, 
				current_user: req.user
			});
		})
	})
	
});

app.post('/api/users/:follower/follows/:followed', function(req, res){
	follows_provider.follow(req.params.follower, req.params.followed, function(err){
		res.send({success : true})		
		console.log(err)		
	})
	
});

app.delete('/api/users/:follower/follows/:followed', function(req, res){
	follows_provider.unfollow(req.params.follower, req.params.followed, function(err){
		res.send({success : true})		
		console.log(err)		
	})
	
});



if(app.get('env') == 'test'){
	app.get('/test', function(req, res){
		fs.createReadStream(__dirname + '/test/client/runner.html').pipe(res);
	});

	app.get('/mocha', function(req, res){
		fs.createReadStream(__dirname + '/node_modules/mocha/mocha.js').pipe(res);
	});
	
	app.get('/chai', function(req, res){
		fs.createReadStream(__dirname + '/node_modules/chai/chai.js').pipe(res);
	});
		
}

// Backbone.io backends

app = app.listen(3000);
var io = require('socket.io').listen(app);

//backboneio.listen(app, require('./providers/backends-provider.js'));

io.sockets.on('connection', function (socket) {

  socket.on('new-activity', function (data) {
  	console.log(data.activity)
    socket.broadcast.emit('new-activity', { message: "New activity" });
  });


});



