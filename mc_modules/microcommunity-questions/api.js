var mc = require('microcommunity')
	, User = mc.model('User')
	, Question = mc.model('Question')	

module.exports = function(app){

	app.post('/api/walls/*/question', function(req, res){
		User.findById(req.body.author, function(err, author){
			var question = new Question({
				content : req.body.content,
				wall : req.body.wall,
				walls : [req.body.wall],
				author : author.id,		
				streams : [author.stream]
			})	
			question.save(function(err){
				res.send(question)
			})		
		})
	})

}
