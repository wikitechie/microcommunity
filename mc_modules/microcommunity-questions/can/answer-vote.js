var helpers = require('microcommunity').can.helpers
	, _ = require('underscore')

module.exports = function (answer, user, callback){
	var mc = require('microcommunity')

	if (!user){
		helpers.attachAction(answer, 'vote', false)
		callback(null, answer)
	} else {
		var Container = mc.model('Container')	
			, Question = mc.model('Question')
		Container.findById(answer.question.container, function(err, container){					
			if (!container.isMember(user)){		
				helpers.attachAction(answer, 'vote', false)
				callback(null, answer)			
			} else {
			
				var vote = _.find(answer.votes, function(vote){ return (vote.user.toString() === user.id.toString()) })
			
				if (vote) {
					helpers.attachAction(answer, 'vote', false)					
				} else {
					helpers.attachAction(answer, 'vote', true)
				}
				callback(null, answer)								

				
			}
		})
	}
	
}
