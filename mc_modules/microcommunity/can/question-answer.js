var helpers = require('./helpers')
	, _ = require('underscore')

module.exports = function (question, user, callback){
	var mc = require('microcommunity')
	
	function answersCallback(err, question){	
	
		for (var i=0; i<question.answers.length; i++){
			question.answers[i].question = question
		}
	
		mc.can.authorizeCollection(question.answers, 'answer', 'vote', user, function(err, answers){	
		mc.can.authorizeCollection(question.answers, 'answer', 'verify', user, function(err, answers){					
			for (var i=0; i<answers.length; i++){
				delete answers[i].question
			}	
			question.answers = answers			
			callback(null, question)
		})	
		})			
	}

	if (question.objectType === 'question'){
		if (!user){
			helpers.attachAction(question, 'canAnswer', false)
			answersCallback(null, question)
		} else {		
			var answer = _.find(question.answers, function(answer){ 
				return (answer.author.id.toString() === user.id.toString()) 
			})
			
			if (answer){
				helpers.attachAction(question, 'canAnswer', false)
				answersCallback(null, question)				
			} else {
				helpers.authorizeIfContainerMember(question.container, question, 'canAnswer', user, answersCallback)	
			}			
		} 	
	} else {
		callback(null, question)
	}
	
}
