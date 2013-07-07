var mongoose = require('mongoose')
	, models = require('microcommunity').models
	, hasWall = models.plugins.hasWall
	, hasStream = models.plugins.hasStream	
	, isContent = models.plugins.isContent				
	, _ = require('underscore')
	
var submissionSchema = new mongoose.Schema({
	student : { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
	comment : String,
	date : Date
})	

var homeworkSchema = new mongoose.Schema({
	title: String,
	content : String,
	submissions : [ submissionSchema ]
})

homeworkSchema.pre('init', function(next, doc){
	this.model('User').populate(doc, 'submissions.student', next)
})

homeworkSchema.methods.getSubmission = function(user){
	if (!user) return false
	return _.find(this.submissions, function(submission){ 
		submission.student.toString() ===  user.id.toString()
	})
}

homeworkSchema.plugin(hasWall, { displayNameAttribute : 'title', wallType : 'homework' })
homeworkSchema.plugin(isContent)

module.exports = homeworkSchema
