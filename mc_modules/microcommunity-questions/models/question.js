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

questionSchema.statics.populateItem = function(doc, next){
	var User = models.getModel('User')
	User.populate(doc, 'answers.author', next)
}

questionSchema.plugin(isItem, { objectType : 'question' })
questionSchema.plugin(isContent)

module.exports = questionSchema
