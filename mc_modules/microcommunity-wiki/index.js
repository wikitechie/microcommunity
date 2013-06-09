

var microcommunity = require('microcommunity')

require('./models/wiki')
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
	, Wiki = mongoose.model('Wiki')
	, User = mongoose.model('User')
	, Post = mongoose.model('Post')
	, Resource = require('express-resource')	

var app = module.exports = microcommunity.plugin(__dirname)

addWikiPublisher(app)
addWikipagePublisher(app)

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
})

var wikipagesRoutes = require('./routes')

app.setupOnContainer = function(containersPath){
	wikipagesRoutes.setup(app, containersPath)
} 

app.setupOnContainer('wikis')






