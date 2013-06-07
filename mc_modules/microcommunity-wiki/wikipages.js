var mongoose = require('mongoose')
	, Wikipage = mongoose.model('Wikipage')
	, Wall = mongoose.model('Wall')
	, Activity = mongoose.model('NewWikipageActivity')
	, Revision = mongoose.model('Revision')
	//, Wiki = mongoose.model('Wiki')
	, User = mongoose.model('User')
	, Post = mongoose.model('Post')

/* exports.new = function(req, res){
	Wiki.findById(req.params.wiki, function(err, wiki){
		res.loadPage('wikipage-form', { 
			wiki : wiki,
			edit : false, 
			title : ( req.query.title || '' ),
			action : '/wikis/' + req.params.wiki + '/pages'
		})		
	})
}

exports.create = function(req, res){	
	Wiki.findById(req.params.wiki, function(err, wiki){	
		var wikipage = new Wikipage({
			title : req.body.title,
			content : req.body.content,
			wiki : wiki.id
		})
		wikipage.save(function(err, wikipage){	
			var activity = new Activity({
				author : req.user._id,
				walls : [wikipage.wall, wiki.wall.id],
				wikipage : wikipage.id,
				streams : [req.user.stream, wikipage.stream, wiki.stream]
			})		
			activity.save(function(err, activity){
				res.redirect('/wikis/' + wiki.id + '/pages/' + wikipage.id)				
			})
		})	
	})
} */

exports.show = function(req, res){
	Wikipage.findById(req.params.page, function(err, wikipage){	
		Wall.loadItems(wikipage.wall, function(err, items){
			res.loadPage('wikipage', {
				wikipage : wikipage,
				items : items 				
			})
		})
	})
} 

exports.edit = function(req, res){	
	Wikipage.findById(req.params.page, function(err, wikipage){
		res.loadPage('wikipage-form', { 
			edit : true, 
			wikipage : wikipage, 
			action : '/wikis/' + req.params.wiki + '/pages/' + wikipage.id  
		})
	})	
}


exports.update = function(req, res){
	Wikipage.findByIdAndUpdate(req.params.page, 
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
				streams : [req.user.stream, wikipage.stream],			
				wikipage : wikipage.id,
				diff : diff.diffWords(wikipage.content, content),
				summary : summary	
			})
	
			revision.save(function(err, activity){
				res.redirect('/wiki/' + wikipage.id)				
			})
	})	
}


