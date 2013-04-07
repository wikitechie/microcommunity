var flash = require('connect-flash')
	, passport = require('passport')
	, mongoose = require('mongoose')
	, User = mongoose.model('User')

exports.install = function(app){

	app.get('/account', ensureAuthenticated, function(req, res){
		res.render('account', { current_user: req.user });
	});


	app.get('/login', function(req, res){
	
		res.loadPage('login', {
			message : req.flash('error')
		})
		//res.render('login', { current_user: req.user, message: req.flash('error') });
	});


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
		} ) (req, res, next);
	});

		
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});
	
	//Google OpenID
	app.get('/auth/google', passport.authenticate('google'));
	app.get('/auth/google/return', 
		passport.authenticate('google', { successRedirect: '/',
		                                  failureRedirect: '/login' }));
};

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}


