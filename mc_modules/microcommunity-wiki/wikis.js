var mongoose = require('mongoose')
	, Wikipage = mongoose.model('Wikipage')
	, Wall = mongoose.model('Wall')
	, Activity = mongoose.model('NewWikipageActivity')
	, Revision = mongoose.model('Revision')
	, Wiki = mongoose.model('Wiki')
	, User = mongoose.model('User')
	, Post = mongoose.model('Post')

exports.show = function(req, res){
	Wiki.findById(req.params.wiki, function(err, wiki){
		Wikipage.findById(wiki.homePage, function(err, wikipage){
			Wall.loadItems(wikipage.wall, function(err, items){
				res.loadPage('wikipage', { 
					wiki : wiki,
					wikipage : wikipage,
					items : items
				})		
			})		
		})		
	})
}

exports.wall = function(req, res){
	Wiki.findById(req.params.wiki, function(err, wiki){
		Wall.loadItems(wiki.wall, function(err, items){
			res.loadPage('wiki', { 
				wiki : wiki, 
				items : items
			})
		})		
	})	
}

exports.index = function(req, res){
	Wiki.find().exec(function(err, wikis){
		res.loadPage('wikis', { wikis : wikis })	
	})
}

exports.create = function(req, res){	
	var wiki = new Wiki({
		name : req.body.name,
		description : req.body.description
	})	
	wiki.save(function(err){
	  res.redirect('/wikis')
	})
}

