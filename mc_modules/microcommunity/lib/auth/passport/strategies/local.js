var passport = require('passport')  
	, LocalStrategy = require('passport-local').Strategy
  , mongoose = require('mongoose')
  , User = mongoose.model('User')	

var strategy = module.exports = new LocalStrategy(
	function(email, password, done) {
		process.nextTick(function () { 
			User.findByEmail(email, function(err, user){
				if (err) { return done(err); }
				if (!user) { return done(null, false, { message: 'Unknown email ' + email }); }
				if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
			return done(null, user);
  		})
	});    	
})

