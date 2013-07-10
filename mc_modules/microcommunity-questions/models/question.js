var mongoose = require('mongoose')
	, models = require('microcommunity').models
	, isItem = models.plugins.isItem
	, isContent = models.plugins.isContent				
	
	
var answerSchema = new mongoose.Schema({
	author : { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
	content : String,
	votes : [{
		user : { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
		value : String
	}],
	votesCount : Number,
	published : Date,
})
	
var questionSchema = new mongoose.Schema({
	content : String,
	answers : [ answerSchema ]
})

questionSchema.pre('init', function(next, doc){
	this.model('User').populate(doc, 'answers.author', next)
})

questionSchema.plugin(isItem)
questionSchema.plugin(isContent)

module.exports = questionSchema
