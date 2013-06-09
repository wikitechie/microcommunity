var mongoose = require('mongoose')
	, hasWall = require('microcommunity/models/plugins/haswall')
	, hasStream = require('microcommunity/models/plugins/has-stream')		

module.exports = function isContainer(schema, options){
	
	var containerType
	if (options && options.containerType){
		containerType = options.containerType
	} else {
		containerType = 'container'
	}

	schema.add({
		name: String,
		description : String,
		containerType : { type : String, default : containerType }		
	})
	
	schema.plugin(hasWall, { displayNameAttribute : 'name' })
	schema.plugin(hasStream)
}
