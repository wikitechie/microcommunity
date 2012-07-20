var flash = require('connect-flash')
	, passport = require('passport') ;

exports.install = function(app){

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
