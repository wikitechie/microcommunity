var helpers = require('microcommunity').can.helpers

module.exports = function (answer, user, callback){
	var mc = require('microcommunity')

	if (!user){
		helpers.attachAction(answer, 'verify', false)
		callback(null, answer)
	} else {
		if (answer.question.author.id.toString() === user.id.toString() )
				helpers.attachAction(answer, 'verify', true)	
		else
				helpers.attachAction(answer, 'verify', false)	
		callback(null, answer)				
	}
	
}
