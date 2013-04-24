var mongoose = require('mongoose')
	, Wikipage = mongoose.model('Wikipage')
	, Wall = mongoose.model('Wall')
	, Stream = mongoose.model('Stream')
	, Activity = mongoose.model('NewWikipageActivity')
	, Revision = mongoose.model('Revision')
	, Wiki = mongoose.model('Wiki')
	, User = mongoose.model('User')
	, Post = mongoose.model('Post')

exports.show = function(req, res){
	Wiki.findById(req.params.wiki, function(err, wiki){
		console.log(wiki)
		Wikipage.findById(wiki.homePage, function(err, wikipage){
			Wall.loadItems(wikipage.wall, function(err, items){
				res.loadPage('wiki-home', { 
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
			res.loadPage('wiki-wall', { 
				wiki : wiki, 
				items : items
			})
		})		
	})	
}

exports.stream = function(req, res){
	Wiki.findById(req.params.wiki, function(err, wiki){
		Stream.loadItems(wiki.stream, function(err, items){
			res.loadPage('wiki-stream', { 
				wiki : wiki, 
				items : items
			})
		})		
	})	
}

exports.index = function(req, res){
	Wiki.find().exec(function(err, wikis){
		res.loadPage('wiki-index', { wikis : wikis })	
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

