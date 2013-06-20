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
	sections : [sectionSchema]	
})

materialSchema.methods.getSidebar = function(){
	var materialLink = "/materials/" + this.id
	var links = [ 
			{ label : 'Home', url : materialLink, icon : 'icon-home' },
			{ label : 'Members', url : materialLink + '/members', icon : 'icon-user' },				
			{ label : 'Wall', url : materialLink + '/wall', icon : 'icon-comment' },
			{ label : 'Stream', url : materialLink + '/stream', icon : 'icon-list-alt' },
			{ label : 'New Wikipage', url : materialLink + '/wikipages/new', icon : 'icon-pencil' },
			{ label : 'Ask a Question', url : materialLink + '/#', icon : 'icon-question-sign' },
			{ label : '<i class=""></i> Upload a File', url : materialLink + '/files/new', icon : 'icon-upload' }																		
		]		
	return {
		header : this.name,
		links : links
	}
}

var containerOptions = { 
	containerType : 'material'
}

materialSchema.plugin(isContainer, containerOptions)

module.exports = materialSchema
