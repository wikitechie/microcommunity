
var microcommunity = require('microcommunity')

require('./models/wikipage')
require('./models/activity')
require('./models/revision')

var mongoose = require('mongoose')
	, Wikipage = mongoose.model('Wikipage')
	, Wall = mongoose.model('Wall')
	, Activity = mongoose.model('NewWikipageActivity')
	, Revision = mongoose.model('Revision')

var app = module.exports = microcommunity.plugin(__dirname)

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
	req.flash('error', 'You should be logged in to view this page')	  
  res.redirect('/login');
}

app.get('/wiki/new', ensureAuthenticated, function(req, res){	
	res.loadPage('wikipage-form', { 
		edit : false, 
		title : ( req.query.title || '' ),
		action : '/wiki/new' 
	})
})

app.get('/wiki/:id/edit', ensureAuthenticated, function(req, res){	
	Wikipage.findById(req.params.id, function(err, wikipage){
		res.loadPage('wikipage-form', { 
			edit : true, 
			wikipage : wikipage, 
			action : '/wiki/' + wikipage.id + '/edit' 
		})
	})	
})

app.get('/wiki/:id', function(req, res){
	Wikipage.findById(req.params.id, function(err, wikipage){	
		Wall.loadItems(wikipage.wall, function(err, wall){		
			res.loadPage('wikipage', {
				wikipage : wikipage,
				items : wall.items 				
			})
		})
	})
})

app.post('/wiki/:id/edit', ensureAuthenticated, function(req, res){
	Wikipage.findByIdAndUpdate(req.params.id, {$set : {content : req.body.content}}, function(err, wikipage){
		var dbref = new mongoose.Types.DBRef('wikipages', wikipage.id)	
				
		var revision = new Revision({
			content : req.body.content,
			author : req.user._id,
			wall : wikipage.wall,
			wikipage : wikipage.id
		})
	
		revision.save(function(err, activity){
			res.redirect('/wiki/' + wikipage.id)				
		})
	})	
})

app.post('/wiki/new', ensureAuthenticated, function(req, res){	
	var wikipage = new Wikipage({
		title : req.body.title,
		content : req.body.content
	})
	
	wikipage.save(function(err, wikipage){
		var activity = new Activity({
			author : req.user._id,
			wall : wikipage.wall,
			wikipage : wikipage.id
		})
		
		activity.save(function(err, activity){
			res.redirect('/wiki/' + wikipage.id)				
		})				

	})

})
