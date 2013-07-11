var mc = require('microcommunity')
	, plugin = mc.plugin
	, auth = mc.auth
	, User = mc.model('User')

var app = module.exports = plugin(__dirname)

app.get('/root', auth.ensureAuthenticated, auth.ensureRoot, function(req, res){ 
	User.find({}, function(err, users){
		console.log(users)
		res.loadPage('root', { users : users })
	})	
})

app.post('/users/:user/role', auth.ensureAuthenticated, auth.ensureRoot, function(req, res){

	User.findByIdAndUpdate(req.params.user, { $set : { role : req.body.role } }, function(err, user){
		res.redirect('/root')
	})
	
}) 
