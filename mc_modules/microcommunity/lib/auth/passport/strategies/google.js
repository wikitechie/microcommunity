var passport = require('passport')  
  , GoogleStrategy = require('passport-google').Strategy
  , mongoose = require('mongoose')
  , User = mongoose.model('User')  

module.exports = new GoogleStrategy({
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
)
