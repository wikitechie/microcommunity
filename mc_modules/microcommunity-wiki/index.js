

var microcommunity = require('microcommunity')

require('./models/wiki')
require('./models/wikipage')
require('./models/activity')
require('./models/revision')

var mongoose = require('mongoose')
	, Wikipage = mongoose.model('Wikipage')
	, Wall = mongoose.model('Wall')
	, Activity = mongoose.model('NewWikipageActivity')
	, Revision = mongoose.model('Revision')
	, Wiki = mongoose.model('Wiki')
	, User = mongoose.model('User')
	, Post = mongoose.model('Post')
	, Resource = require('express-resource')
	

var app = module.exports = microcommunity.plugin(__dirname)

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
	req.flash('error', 'You should be logged in to view this page')	  
  res.redirect('/login');
}

var wikiRoutes = require('./wikis')

app.get('/wikis', wikiRoutes.index)
app.get('/wikis/:wiki', wikiRoutes.show)
app.get('/wikis/:wiki/wall', wikiRoutes.wall)
app.get('/wikis/:wiki/stream', wikiRoutes.stream)
app.post('/wikis', wikiRoutes.create)

app.resource('wikis/:wiki/pages', require('./wikipages'))

app.put('/api/wikipages/:id', function(req, res){
	Wikipage.findByIdAndUpdate(req.params.id, 
		{ $set : { content : req.body.content } }, 
		{ new : false }, 
		function(err, wikipage){
				
			var dbref = new mongoose.Types.DBRef('wikipages', wikipage.id)
			var diff = require('diff')
			var content = req.body.content
			var summary = req.body.summary
				
			var revision = new Revision({
				content : content,
				author : req.user._id,
				walls : [wikipage.wall],
				streams : [req.user.stream, wikipage.stream, wikipage.wiki.stream ],			
				wikipage : wikipage.id,
				diff : diff.diffWords(wikipage.content, content),
				summary : summary	
			})
	
			revision.save(function(err, activity){
				wikipage.content = content
				res.send(wikipage)				
			})
	})
})


app.post('/api/publishers/wiki-wall/posts', function(req, res){
	User.findById(req.body.author, function(err, author){
		var post = new Post({
			content : req.body.content,
			wall : req.body.wall,
			walls : [req.body.wall],
			author : author.id,		
			streams : [author.stream,]
		})	
		post.save(function(err){
			res.send(post)
		})		
	})
})

app.post('/api/publishers/wiki-wall/photos', function(req, res){
	User.findById(req.body.author, function(err, author){
		var post = new Photo({
			content : req.body.content,
			wall : req.body.wall,
			walls : [req.body.wall],
			author : author.id,		
			streams : [author.stream]
		})	
		post.save(function(err){
			res.send(post)
		})		
	})
})


app.post('/api/publishers/wikipage-wall/posts', function(req, res){
	User.findById(req.body.author, function(err, author){
		var post = new Post({
			content : req.body.content,
			wall : req.body.wall,
			walls : [req.body.wall],
			author : author.id,		
			streams : [author.stream]
		})	
		post.save(function(err){
			res.send(post)
		})		
	})
})

app.post('/api/publishers/wikipage-wall/photos', function(req, res){
	User.findById(req.body.author, function(err, author){
		var post = new Photo({
			content : req.body.content,
			wall : req.body.wall,
			walls : [req.body.wall],
			author : author.id,		
			streams : [author.stream]
		})	
		post.save(function(err){
			res.send(post)
		})		
	})
})



