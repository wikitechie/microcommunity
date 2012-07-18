
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
  , LocalStrategy = require('passport-local').Strategy;

mongoose.connect('mongodb://localhost/microcommunity');

var User = mongoose.model('User', new mongoose.Schema({
	email: String,
	password: String
}));

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
      
      // Find the user by username.  If there is no user with the given
      // username, or the password is not correct, set the user to `false` to
      // indicate failure and set a flash message.  Otherwise, return the
      // authenticated `user`.
      
  		

      
   	User.findOne({ email: email }, function(err, user){
   			console.log(user);
		    if (err) { return done(err); }
		    if (!user) { return done(null, false, { message: 'Unknown email ' + email }); }
		    if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
		    return done(null, user);
    	});
    	
    });
  }
));



var Comments = new mongoose.Schema({
    name     : String
  , text      : String
});


var Post = mongoose.model('Post', new mongoose.Schema({
  name: String,
  text: String,
  comments : [Comments]
}));

var Wikipage = mongoose.model('Wikipage', new mongoose.Schema({
  title: String,
  body: String
}));


var post;
post = new Post({
	name: "Amjad",
	text: "Hello, MongoDB!",
	comments: [ {name: "Commenter", text: "Some comment"},{name: "Commenter2", text: "Some comment2"}]
});


//post.save(function (err) {
//  if (!err) console.log('Success!');
//});

//post.save();



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



app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});


app.get('/login', function(req, res){
  res.render('login', { user: req.user, message: req.flash('error') });
});


app.get('/signup', function(req, res){
  res.render('signup', { user: req.user });
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
  Post.find(function(err, posts) {
	  Wikipage.find(function(err, wikipages) {
			console.log(posts);
			res.render('index', { title: 'MicroCommunity', posts : posts, wikipages: wikipages, user: req.user });
	  });
  });
});


app.get('/api/posts', function(req, res){
  return Post.find(function(err, posts) {
    return res.send(posts);
  });
});

app.get('/api/posts/:id', function(req, res){
  return Post.findById(req.params.id, function(err, post) {
    if (!err) {
      return res.send(post);
    }
  });
});

app.put('/api/posts/:id', function(req, res){
  return Post.findById(req.params.id, function(err, post) {
    post.text = req.body.text;
    post.name = req.body.name;
    return post.save(function(err) {
      if (!err) {
        console.log("updated");
      }
      return res.send(post);
    });
  });
});

app.post('/api/posts', function(req, res){
  var post;
  post = new Post({
    text: req.body.text,
    name: req.body.name

  });
  post.save(function(err) {
    if (!err) {
      return console.log("created");
    }
  });
  return res.send(post);
});

//comments api
app.post('/api/posts/:id/comments', function(req, res){

	var comment = {
		text : req.body.text,
		name : req.body.name	
	};

	Post.update(
		{ _id :  mongoose.Types.ObjectId(req.params.id) }, 
		{ $push : {comments: comment } },  
		function(err, post){
			console.log(post);
		}
	);	
	
});

app.get('/api/posts/:id/comments', function(req, res){
  Post.findById(req.params.id, function(err, post) {
    if (!err) {
			return res.send(post.comments);
    }
  });
});


//wikipages api

app.get('/api/wikipages', function(req, res){
  return Wikipage.find(function(err, wikipages) {
    return res.send(wikipages);
  });
});

app.get('/api/wikipages/:id', function(req, res){
  return Wikipage.findById(req.params.id, function(err, wikipage) {
    if (!err) {
      return res.send(wikipage);
    }
  });
});

app.put('/api/wikipages/:id', function(req, res){
  return Wikipage.findById(req.params.id, function(err, wikipage) {
    wikipage.title = req.body.title;
    wikipage.body = req.body.body;
    return wikipage.save(function(err) {
      if (!err) {
        console.log("updated");
      }
      return res.send(wikipage);
    });
  });
});

app.post('/api/wikipages', function(req, res){
  var wikipage;
  wikipage = new Wikipage({
    title: req.body.title,
    body: req.body.body

  });
  wikipage.save(function(err) {
    if (!err) {
      return console.log("created");
    }
  });
  return res.send(wikipage);
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

