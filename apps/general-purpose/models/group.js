var mongoose = require('mongoose')
	, models = require('microcommunity').models
	, isContainer = models.plugins.isContainer

var groupSchema = new mongoose.Schema({
	displayName : String,
	description : String,
})

groupSchema.methods.getSidebar = function(){
	var groupLink = "/groups/" + this.id
	var links = [ 
			{ label : 'Home', url : materialLink, icon : 'icon-book' },
			{ label : 'Members', url : materialLink + '/members', icon : 'icon-user' },							
			{ label : 'Stream', url : materialLink + '/stream', icon : 'icon-list-alt' }
		]		
	return {
		header : this.displayName,
		links : links
	}
}

var containerOptions = { 
	containerType : 'group',
	displayNameAttribute : 'displayName'
}

groupSchema.plugin(isContainer, containerOptions)

module.exports = groupSchema
