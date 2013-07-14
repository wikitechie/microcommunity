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
	attachements : [attachementSchema],
})

var materialSchema = new mongoose.Schema({
	courseTitle : String,
	description : String,
	semester : { academicYear : Number, season : String },
	course : { type : mongoose.Schema.Types.ObjectId, ref : 'Course' },
	sections : [sectionSchema],
	highlighted : { type : mongoose.Schema.Types.ObjectId }
})

materialSchema.methods.getSidebar = function(){
	var materialLink = "/materials/" + this.id
	var links = [ 
			{ label : 'Home', url : materialLink, icon : 'icon-home' },
			{ label : 'Wall', url : materialLink + '/wall', icon : 'icon-comment' },
			{ label : 'Members', url : materialLink + '/members', icon : 'icon-user' },							
			{ label : 'Stream', url : materialLink + '/stream', icon : 'icon-list-alt' },
			{ label : 'New Wikipage', url : materialLink + '/wikipages/new', icon : 'icon-pencil' },
			{ label : '<i class=""></i> Upload a File', url : materialLink + '/files/new', icon : 'icon-upload' }																		
		]		
	return {
		header : this.displayName,
		links : links
	}
}

materialSchema.statics.populateContainer = function(doc, callback){
	var Course = models.getModel('Course')
	Course.populate(doc, 'course', callback)
}

var containerOptions = { 
	containerType : 'material',
	displayNameAttribute : 'fullDisplayName'
}

materialSchema.virtual('fullDisplayName').get(function(){
	return this.courseTitle + ' (' + this.semesterName + ')'
})

materialSchema.virtual('displayName').get(function(){
	return this.courseTitle
})

materialSchema.virtual('semesterName').get(function(){
	if (this.semester.season == 'fall')
		return 'Fall ' + (this.semester.academicYear - 1)
	else
		return 'Spring ' + (this.semester.academicYear)	
})

materialSchema.plugin(isContainer, containerOptions)

module.exports = materialSchema
