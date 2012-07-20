
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
  , Resource = require('express-resource'); 


mongoose.connect('mongodb://localhost/microcommunity');

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
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
		 	User.findOne({ email: email }, function(err, user){
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


app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});


app.get('/login', function(req, res){
  res.render('login', { user: req.user, message: req.flash('error') });
});


app.get('/signup', function(req, res){
  res.render('signup', { user: req.user, message: req.flash('error') });
});

app.post('/signup', function(req, res){

	if(req.body.password == req.body.passwordconf) {
		var user;
		user = new User({
		  email: req.body.email,
		  password: req.body.password

		});
		user.save(function(err) {
		  if (!err) {
		    console.log("user created");
				return res.redirect('/');		    
		  }
		});	
	}

});

app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {

    if (err) { return next(err) }
    if (!user) {
      req.flash('error', info.message);
      return res.redirect('/login')
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req, res, next);
});

  
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
  

//app.get('/', routes.index);

app.get('/', function(req, res){

  Wikipage.find(function(err, wikipages) {	  
Post.find(function(err, posts) {
  	
  	if(!err){
  	
  		var userIds = _.pluck(posts, "user");
  		
  		User.find({ _id : { $in : userIds } }, function(err, users){
  			var map = {};
  			_.each(users, function(u){
  				map[u.id] = u;
  			});
  			
  			var joinedposts = [];
  			var joinedpost = {};
 				var functions = []; 			
  			
  			_.each(posts, function(p){  			
  			
  				function myfunction(callback) {
						var user = {
							_id : map[p.user]._id,
							email: map[p.user].email  				  				
						};  				
						
						var functions = [];    		
		  			var final_comments = [];
		  			var j = 0;
		  	
						for(var i=0; i< p.comments.length; i++){
							
							function myfunction(callback){							
								var comment = p.comments[j];
								j++;
							
								User.findById(comment.user, function(err, user){
									var joinedcomment = {
										text : comment.text,
										name : comment.name,
										_id  : comment._id,
										user : user,
										created_at : comment.created_at
									};
								
									final_comments.push(joinedcomment);		
								
									callback(null);
								
								});    			
							}    			
							functions.push(myfunction);   		    			
						}
		  		
						async.waterfall(functions, function(err, result){
							var joinedpost = {
								_id  : p._id,
								name : p.name,
								text : p.text,
								user : user,
								created_at : p.created_at,
								comments: final_comments
							};
					  	joinedposts.push(joinedpost);     			
					  	callback(null);
						});					
		  		  				
  				}
  				
  				functions.push(myfunction);  						
  			});
  			
	
				async.waterfall(functions, function(err, result){
					return res.render('index', { posts: joinedposts, wikipages: wikipages, user: req.user });
				});				
  			
  		});

  	}

  });		
	  });
});



app.listen(3000);



// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

