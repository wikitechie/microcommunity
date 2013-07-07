var mc = require('microcommunity')
	, can = mc.can
	, Homework = mc.model('Homework')
	, Activity = mc.model('NewHomeworkActivity')	
	, Wall = mc.model('Wall')


exports.new = function(req, res){
	res.loadPage('homework-form')		
}

exports.create = function(req, res){
		var homework = new Homework({
			title : req.body.title,
			content : req.body.content,
			container : req.container.id
		})
		homework.save(function(err, homework){	
			var activity = new Activity({
				author : req.user._id,
				walls : [homework.wall, req.container.wall.id],
				homework : homework.id,
				streams : [req.container.stream]
			})		
			activity.save(function(err, activity){
				res.redirect('/homeworks/' + homework.id)				
			})
		})	
}

exports.show = function(req, res){
	Homework.findById(req.params.homework, function(err, homework){	
		Wall.loadItems(homework.wall, function(err, items){		
			can.authorizeItems(items, req.user, function(err, items){
				var h = homework.toJSON()
				can.authorize(h.wall, 'wall', 'publish', req.user, function(err, wall){
					res.loadPage('homework', {
						wall : homework.wall,
						homework : h,
						items : items,
						submission : homework.getSubmission(req.user)			
					})		
				})		
			})
		})
	})
}

exports.submissions = function(req, res){
	Homework.findById(req.params.homework, function(err, homework){	
		res.loadPage('submissions', {
			homework : homework		
		})	
	})
}

exports.newSubmission = function(req, res){
	var submission = req.body	
	submission.date = new Date()
	var update = { $push : { submissions : submission } }	
	Homework.findByIdAndUpdate(req.params.homework, update, function(err, homework){	
		res.send(200, submission)
	})	
}

