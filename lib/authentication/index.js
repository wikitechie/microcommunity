
var express = require('express')
	, passport = require('passport')	

var app = module.exports = express.createServer()

app.configure(function(){
  app.set('views', __dirname + '/views')
})

app.get('/login', function(req, res){
	res.loadPage('login', {
		message : req.flash('error')
	})
	//res.render('login', { current_user: req.user, message: req.flash('error') })
})

app.post('/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
	  if (err) { return next(err) }
	  if (!user) {
	    req.flash('error', info.message)
	    return res.redirect('/login')
	  }
	  req.logIn(user, function(err) {
	    if (err) { return next(err) }
	    return res.redirect('/')
	  })
	} ) (req, res, next)
})
		
app.get('/logout', function(req, res){
	req.logout()
	res.redirect('/')
})


