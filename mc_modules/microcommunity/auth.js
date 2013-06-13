exports.ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) { return next(); }
	req.flash('error', 'You should be logged in to view this page')	  
  res.redirect('/login');
}

exports.ensureContainerRole = function(role){
	return function(req, res, next){
		var hasRole = req.container.hasRole(req.user, role)
		console.log(hasRole)
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
