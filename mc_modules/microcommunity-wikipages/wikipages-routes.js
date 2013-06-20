var mongoose = require('mongoose')
	, Wikipage = mongoose.model('Wikipage')
	, Wall = mongoose.model('Wall')
	, Activity = mongoose.model('NewWikipageActivity')
	, Revision = mongoose.model('Revision')
	, Container = mongoose.model('Container')
	, User = mongoose.model('User')
	, Post = mongoose.model('Post')

exports.new = function(req, res){
	res.loadPage('wikipage-form')		
}

exports.create = function(req, res){
		var wikipage = new Wikipage({
			title : req.body.title,
			content : req.body.content,
			container : req.container.id
		})
		wikipage.save(function(err, wikipage){	
			var activity = new Activity({
				author : req.user._id,
				walls : [wikipage.wall, req.container.wall.id],
				wikipage : wikipage.id,
				streams : [req.user.stream, wikipage.stream, req.container.stream]
			})		
			activity.save(function(err, activity){
				res.redirect('/wikipages/' + wikipage.id)				
			})
		})	
}

exports.show = function(req, res){
	Wikipage.findById(req.params.wikipage, function(err, wikipage){	
		Wall.loadItems(wikipage.wall, function(err, items){
			res.loadPage('wikipage', {
				wikipage : wikipage,
				items : items 				
			})
		})
	})
}

exports.put = function(req, res){
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
			
			var difference = diff.diffWords(wikipage.content, content)
		
			var revision = new Revision({
				content : content,
				author : req.user._id,
				walls : [wikipage.wall],
				streams : streams,			
				wikipage : wikipage.id,
				diff : difference,
				summary : summary	
			})
			
			revision.save(function(err, activity){
				wikipage.content = content
				res.send(wikipage)				
			})
	})
}
