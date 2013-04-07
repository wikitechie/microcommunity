var passport = require('passport')  
	, LocalStrategy = require('passport-local').Strategy
  , GoogleStrategy = require('passport-google').Strategy
  , mongoose = require('mongoose')
  , User = mongoose.model('User')

//passport setup
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
  });
});

passport.use(new LocalStrategy(
	function(email, password, done) {
		process.nextTick(function () { 
			User.findByEmail(email, function(err, user){
				if (err) { return done(err); }
				if (!user) { return done(null, false, { message: 'Unknown email ' + email }); }
				if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
			return done(null, user);
  		})
	});    	
}));


passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:3000/auth/google/return',
    realm: 'http://localhost:3000'
  },
  function(identifier, profile, done) {
  
  	var email = profile.emails[0].value;
		User.findByEmail(email, function(err, user){
			if (!user) {
				var user = new User({
					email: email,
					openId: identifier,
					displayName : profile.displayName
				})
							
				user.save(function(err){
					if (!err) {
						console.log("user created");
						return done(null, user);
					}				
				});				
			}			
			return done(null, user);
		})
  }
));

