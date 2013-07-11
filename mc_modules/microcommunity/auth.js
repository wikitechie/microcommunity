//authentication
exports.ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) { return next(); }
	req.flash('error', 'You should be logged in to view this page')	  
  res.redirect('/login');
}

//root role
exports.ensureRoot = function(req, res, next){
	if (req.user.email.toString() === req.app.get('site').rootUser.toString()) { next() } else {
		req.flash('error', 'You should be root user to view this page')	  
		res.redirect('/login');	
	}	
}

//global-level roles
exports.ensureRole = function(role){
	return function(req, res, next){
		if (req.user.role == role) { next() }
		else {
			req.flash('error', 'You do not have sufficient priviliges to access this area')	  
			res.redirect('/login');			
		}	
	}
}

//container-level roles
exports.ensureContainerRole = function(role){
	return function(req, res, next){
		var hasRole = req.container.hasRole(req.user, role)
		if (hasRole) {
			next()
		} else {
			res.redirect('back');		
		}
	}	
}

exports.ensureContainerAdmin = function(){
	return exports.ensureContainerRole('mc:admin')
}

exports.ensureContainerMember = function(){
	return exports.ensureContainerRole('mc:member')
}
