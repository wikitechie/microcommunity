
var microcommunity = require('microcommunity')
	, models = microcommunity.models
	, items = microcommunity.items
	, auth = microcommunity.auth

//registering models
var questionSchema = require('./models/question')

models.define('Question', 'question', 'items', questionSchema)

//adding stream items
items.addItem('Question', 'components/question/model')

microcommunity.can.define('question', 'answer', require('./can/question-answer'))
microcommunity.can.define('answer', 'vote', require('./can/answer-vote'))
microcommunity.can.define('answer', 'verify', require('./can/answer-verify'))

microcommunity.registerPlugin(__dirname)

//api
var api = require('./api')	

//initialization function
module.exports = function(options){
	var app = microcommunity.plugin(__dirname)
	api(app)	
	return app	
}

