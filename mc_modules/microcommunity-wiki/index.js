

var microcommunity = require('microcommunity')

//require('./models/wiki')
require('./models/wikipage')
require('./models/activity')
require('./models/revision')

var addWikiPublisher = require('./wiki-publisher')
	, addWikipagePublisher = require('./wikipage-publisher')

var mongoose = require('mongoose')
	, Wikipage = mongoose.model('Wikipage')
	, Wall = mongoose.model('Wall')
	, Activity = mongoose.model('NewWikipageActivity')
	, Revision = mongoose.model('Revision')
	//, Wiki = mongoose.model('Wiki')
	, User = mongoose.model('User')
	, Post = mongoose.model('Post')
	, Resource = require('express-resource')	

var app = module.exports = microcommunity.plugin(__dirname)

addWikiPublisher(app)
addWikipagePublisher(app)

/*
app.container('/wikis', 'Wiki', 'wikis', function(req, res){
	Wiki.findById(req.params.id, function(err, wiki){
		Wikipage.findById(wiki.homePage, function(err, wikipage){
			Wall.loadItems(wikipage.wall, function(err, items){
				res.loadPage('wikis/show', { 
					wiki : wiki,
					wikipage : wikipage,
					items : items
				})		
			})		
		})		
	})
}) */

var wikipagesRoutes = require('./wikipages')
app.get('/wikipages/:page', wikipagesRoutes.show)
/* app.get('/wikipages/:page/edit', wikipagesRoutes.edit)
app.post('/wikipages/:page/', wikipagesRoutes.update) */

app.put('/api/wikipages/:id', function(req, res){
	Wikipage.findByIdAndUpdate(req.params.id, 
		{ $set : { content : req.body.content } }, 
		{ new : false }, 
		function(err, wikipage){
				
			var dbref = new mongoose.Types.DBRef('wikipages', wikipage.id)
			var diff = require('diff')
			var content = req.body.content
			var summary = req.body.summary
			
			var streams = [req.user.stream, wikipage.stream ]
			
			if (req.body.material){
				streams.push(req.body.material.stream)
			}
				
			var revision = new Revision({
				content : content,
				author : req.user._id,
				walls : [wikipage.wall],
				streams : streams,			
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






