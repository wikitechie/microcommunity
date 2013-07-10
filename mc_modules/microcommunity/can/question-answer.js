var helpers = require('./helpers')

module.exports = function (question, user, callback){
	var mc = require('microcommunity')

	if (question.objectType === 'question'){
		if (!user){
			helpers.attachAction(question, 'canAnswer', false)
			callback(null, question)
		} else {		
			helpers.authorizeIfContainerMember(question.container, question, 'canAnswer', user, callback)	
		} 	
	} else {
		callback(null, question)
	}
	
}
