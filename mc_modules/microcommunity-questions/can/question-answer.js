var helpers = require('microcommunity').can.helpers
	, _ = require('underscore')

module.exports = function (question, user, callback){
	var mc = require('microcommunity')
	
	function answersCallback(err, question){	
		var list = []
	
		for (var i=0; i<question.answers.length; i++){
			list.push({ question : question, answer : question.answers[i] })
		}
		console.log('here')
		console.log(list.length)
	
		mc.can.authorizeCollection(list, 'answer', 'vote', user, function(err, answers){	
			/*for (var i=0; i<answers.length; i++){
				delete answers[i].question
			}*/	
			//question.answers = answers			
			callback(null, question)
		})			
	}

	if (question.objectType === 'question'){
		if (!user){
			helpers.attachAction(question, 'answer', false)
			answersCallback(null, question)
		} else {		
			var answer = _.find(question.answers, function(answer){ 
				return (answer.author.id.toString() === user.id.toString()) 
			})

			if (answer){
				helpers.attachAction(question, 'answer', false)
				answersCallback(null, question)				
			} else {
				helpers.authorizeIfContainerMember(question.container, question, 'answer', user, answersCallback)	
			}			
		} 	
	} else {
		callback(null, question)
	}
	
}
