var mc = require('microcommunity')
	, User = mc.model('User')
	, Wall = mc.model('Wall')
	, Question = mc.model('Question')	

module.exports = function(app){

	app.post('/api/walls/*/question', function(req, res){
		Wall.findById(req.body.wall, function(err, wall){	
			User.findById(req.body.author, function(err, author){
				var question = new Question({
					content : req.body.content,
					wall : req.body.wall,
					walls : [req.body.wall],
					author : author.id,		
					streams : [author.stream],
					container : wall.owner.oid
				})	
				question.save(function(err){
					res.send(question)
				})		
			})
		})		
	})
	
	app.post('/api/questions/:question/answers', function(req, res){
	
		var answer = req.body		
		answer.published = new Date()
		
		var update = { $push : { answers : answer } }
	
		Question.findByIdAndUpdate(req.params.question, update, function(err, question){
			res.send(200, answer)				
		})

	})

}
