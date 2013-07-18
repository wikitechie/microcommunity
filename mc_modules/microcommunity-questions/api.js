var mc = require('microcommunity')
	, User = mc.model('User')
	, Wall = mc.model('Wall')
	, Question = mc.model('Question')	
	, Container = mc.model('Container')
	, can = mc.can

module.exports = function(app){

	app.post('/api/walls/*/question', function(req, res){
		Wall.findById(req.body.wall, function(err, wall){	
			Container.findById(wall.owner.oid, function(err, container){
				User.findById(req.body.author, function(err, author){
					var question = new Question({
						content : req.body.content,
						wall : req.body.wall,
						walls : [req.body.wall],
						author : author.id,		
						streams : [author.stream, container.stream],
						container : wall.owner.oid
					})	
					question.save(function(err){
						console.log(question)
						question = question.toJSON()
						can.authorize(question, 'question', 'answer', req.user, function(err, question){
							console.log(question)
							res.send(question)
						})					
					})		
				})		
			})			
		})		
	})
	
	app.post('/api/questions/:question/answers', function(req, res){	
		var answer = req.body		
		answer.published = new Date()		
		var update = { $push : { answers : answer } }	
		Question.findByIdAndUpdate(req.params.question, update, function(err, question){
			var last = question.answers.length - 1
			
			console.log(question)
			
			var answer = question.answers[last].toJSON()
			can.authorize({answer : answer, question : question}, 'answer', 'vote', req.user, function(err, answer){
				res.send(200, answer)				
			})			
			
		})
	})
	
	app.post('/api/questions/:question/answers/:answer/votes', function(req, res){
		
		var vote = { 
			user : req.body.user,
			value : req.body.type
		}	
		
		var inc		
		if (vote.value === 'up') {inc = 1} else {inc = -1}
		
		var query = { _id : req.params.question, 'answers._id' : req.params.answer }
		var update = { $push : { 'answers.$.votes' : vote }, $inc : { 'answers.$.votesCount' : inc } }
	
		Question.findOneAndUpdate(query, update, function(err, question){
			var _ = require('underscore')
			var answer = _.find(question.answers, function(answer){ return (answer.id === req.params.answer) })	
			
			var answer = answer.toJSON()
			answer.question = question
			
			can.authorize(answer, 'answer', 'vote', req.user, function(err, answer){
				delete answer.question
				res.send(200, answer)
			})
					
			
		})

	})
		

}
