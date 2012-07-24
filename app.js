
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , stylus = require('stylus')
  , bootstrap = require('bootstrap-stylus')
  , mongoose = require('mongoose')
  , passport = require('passport')  
  , flash = require('connect-flash')
  , _ = require('underscore')
  , LocalStrategy = require('passport-local').Strategy
  , async = require('async')
  , Resource = require('express-resource')
  , activities_provider = require('./providers/activities-provider')
  , schemas = require('./providers/mongoose-schemas')
  , mongoose = require('mongoose')
  , backboneio = require('backbone.io'); 

var db = mongoose.connect('mongodb://localhost/microcommunity');

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	schemas.User.findById(id, function(err, user) {
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
		 	schemas.User.findOne({ email: email }, function(err, user){
				  if (err) { return done(err); }
				  if (!user) { return done(null, false, { message: 'Unknown email ' + email }); }
				  if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
				  return done(null, user);
			});    	
    });
  }
));


var app = express.createServer();

//function used to configure bootstrap-stylus
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(bootstrap());
}


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
  app.use(require('connect-assets')());
  app.use(stylus.middleware({
		src: __dirname + '/public',
		compile: compile
	}));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.resource('api/posts', require('./api/posts'));
app.resource('api/posts/:id/comments', require('./api/comments'));    
app.resource('api/wikipages', require('./api/wikipages'));
app.resource('api/activities', require('./api/activities'));        

//authentication pages
var auth = require('./routes/auth');
auth.install(app);

//main app
app.get('/', function(req, res){
	activities_provider.fetchActivities(0,5,function(err, activities){	
		res.render('index', { activities: activities, user: req.user });
	});
});


// Backbone.io backends

app = app.listen(3000);

//backboneio.listen(app, require('./providers/backends-provider.js'));







