
var microcommunity = require('microcommunity')
	, models = microcommunity.models
	, items = microcommunity.items
	, auth = microcommunity.auth

//registering models
var questionSchema = require('./models/question')

models.define('Question', 'question', 'questions', questionSchema)

//adding stream items
items.addItem('Question', 'components/question/model')

microcommunity.registerPlugin(__dirname)

//api
var api = require('./api')	

//initialization function
module.exports = function(options){
	var app = microcommunity.plugin(__dirname)
	api(app)	
	return app	
}

