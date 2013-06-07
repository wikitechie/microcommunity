var mongoose = require('mongoose')
	, Wikipage = mongoose.model('Wikipage')
	, Wall = mongoose.model('Wall')
	, Activity = mongoose.model('NewWikipageActivity')
	, Revision = mongoose.model('Revision')
	, Material = mongoose.model('Material')
	, User = mongoose.model('User')
	, Post = mongoose.model('Post')

exports.new = function(req, res){
	Material.findById(req.params.material, function(err, material){
		res.loadPage('wikipage-form', { 
			material : material,
			edit : false, 
			title : ( req.query.title || '' ),
			action : '/materials/' + req.params.material + '/wikipages'
		})		
	})
}

exports.create = function(req, res){	
	Material.findById(req.params.material, function(err, material){	
		var wikipage = new Wikipage({
			title : req.body.title,
			content : req.body.content,
			material : material.id
		})
		wikipage.save(function(err, wikipage){	
			var activity = new Activity({
				author : req.user._id,
				walls : [wikipage.wall, material.wall],
				wikipage : wikipage.id,
				streams : [req.user.stream, wikipage.stream, material.stream]
			})		
			activity.save(function(err, activity){
				res.redirect('/wikipages/' + wikipage.id)				
			})
		})	
	})
}



