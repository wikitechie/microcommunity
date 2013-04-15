var express = require('express')
	, passport = require('passport')  
  , mongoose = require('mongoose')
  , User = mongoose.model('User')
  , flash = require('connect-flash')  

var app = module.exports = express.createServer();

var local = require('./strategies/local')
	, google = require('./strategies/google')

passport.use(local)
passport.use(google)

app.configure(function(){
  app.use(express.methodOverride());  
	app.use(express.bodyParser())
  app.use(express.cookieParser('keyboard cat'));	
  app.use(flash());
  app.use(express.session());  
  app.use(passport.initialize());
  app.use(passport.session()); 
})

//passport setup
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
  });
});
