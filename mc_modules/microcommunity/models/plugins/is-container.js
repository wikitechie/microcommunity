var mongoose = require('mongoose')
	, models = require('./../index')
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
	
	schema.pre('init', function(next, doc){
		console.log('doc before ' + containerType)
		console.log(doc)	
		if (doc.containerType != containerType){
			doc = null
		}
		console.log('doc after' + containerType)
		console.log(doc)
		next(null, doc)
	})
	
	schema.plugin(hasWall, { displayNameAttribute : 'name' })
	schema.plugin(hasStream)
}
