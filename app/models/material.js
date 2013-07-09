var mongoose = require('mongoose')
	, models = require('microcommunity').models
	, isContainer = models.plugins.isContainer

var attachementSchema = new mongoose.Schema({
	title: String,
	description : String,
	object : { type : mongoose.Schema.Types.DBRef }
})

var sectionSchema = new mongoose.Schema({
	title: String,
	description : String,
	highlighted : Boolean,
	attachements : [attachementSchema],
})

var materialSchema = new mongoose.Schema({
	thumbnailPath : String,	
	sections : [sectionSchema],
	semester : { academicYear : Number, season : String }
})

materialSchema.methods.getSidebar = function(){
	var materialLink = "/materials/" + this.id
	var links = [ 
			{ label : 'Home', url : materialLink, icon : 'icon-home' },
			{ label : 'Wall', url : materialLink + '/wall', icon : 'icon-comment' },
			{ label : 'Members', url : materialLink + '/members', icon : 'icon-user' },							
			{ label : 'Stream', url : materialLink + '/stream', icon : 'icon-list-alt' },
			{ label : 'New Wikipage', url : materialLink + '/wikipages/new', icon : 'icon-pencil' },
			{ label : 'New Homework', url : materialLink + '/homeworks/new', icon : 'icon-pencil' },			
			{ label : 'Ask a Question', url : materialLink + '/#', icon : 'icon-question-sign' },
			{ label : '<i class=""></i> Upload a File', url : materialLink + '/files/new', icon : 'icon-upload' }																		
		]		
	return {
		header : this.name,
		links : links
	}
}

var containerOptions = { 
	containerType : 'material',
	displayNameAttribute : 'displayName'
}

materialSchema.virtual('displayName').get(function(){
	return this.name + ' (' + this.semesterName + ')'
})


materialSchema.virtual('semesterName').get(function(){
	if (this.semester.season == 'fall')
		return 'Fall ' + (this.semester.academicYear - 1)
	else
		return 'Spring ' + (this.semester.academicYear)	
})

materialSchema.plugin(isContainer, containerOptions)

module.exports = materialSchema
