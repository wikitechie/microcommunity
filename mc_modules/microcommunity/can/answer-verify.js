var helpers = require('./helpers')

module.exports = function (answer, user, callback){
	var mc = require('microcommunity')

	if (!user){
		helpers.attachAction(answer, 'canVerify', false)
		callback(null, answer)
	} else {
		if (answer.question.author.id.toString() === user.id.toString() )
				helpers.attachAction(answer, 'canVerify', true)	
		else
				helpers.attachAction(answer, 'canVerify', false)	
		callback(null, answer)				
	}
	
}
