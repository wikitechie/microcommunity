
var express = require('express')
	, passport = require('passport')	
	, mongoose = require('mongoose')
	, User = mongoose.model('User')

var app = module.exports = express.createServer()

app.configure(function(){
  app.set('views', __dirname + '/views')
})


app.get('/signup', function(req, res){
	res.loadPage('signup', {
		message : req.flash('error')
	})	
	// res.render('signup', { current_user: req.user, message: req.flash('error') });
});

app.post('/signup', function(req, res){
	if(req.body.password == req.body.passwordconf) {		
		var user = new User({
			email: req.body.email,
			password: req.body.password, 
			displayName : req.body.displayName			
		})		
		user.save(function(err){
			if (!err) {
				req.logIn(user, function(err) {
					if (err) { return next(err); }
					return res.redirect('/');
				});    
			} else {
				req.flash('error', err );
				res.redirect('/signup')					
			}			
		});
	}
})


//Google OpenID
app.get('/auth/google', passport.authenticate('google'));
app.get('/auth/google/return', 
passport.authenticate('google', { successRedirect: '/',
	                                  failureRedirect: '/login' }));



