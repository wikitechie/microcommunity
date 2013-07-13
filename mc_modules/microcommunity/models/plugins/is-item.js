var mongoose = require('mongoose')
	, _ = require('underscore')
	, models = require('../../models')

module.exports = function Itemable(schema, options){

	if (!options) throw new Error('MicroCommunity isItem Plugin: you should pass options')
	if (!options.objectType) throw new Error ('isItem plugin options: should have objectType attribute')
	var objectType = options ? options.objectType  : "item"
	

	//if (!options.clientPath) throw new Error('MicroCommunity Item Plugin: you should pass clientPath option')	

	schema.add({
		author : { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
		wall : { type : mongoose.Schema.Types.ObjectId, ref : 'Wall' },		
		walls : [{ type : mongoose.Schema.Types.ObjectId, ref : 'Wall' }],
		streams : [{ type : mongoose.Schema.Types.ObjectId, ref : 'Stream' }],		
		item : mongoose.Schema.Types.ObjectId,	
		published : Date,
		objectType : String			
	})
	
	//adding published attribute
	schema.pre('save', function(next){
		this.objectType = objectType		
		this.published = new Date()
		next()
	})	
	
	//populating options
	schema.pre('init', function(next, doc){
		//dangerous hack!
		var type = doc.objectType
		if (!type) type = objectType
		//
		var modelName = models.convert(type, 'object', 'model')
		models.getModel('Item').populate(doc, 'author wall', function(err){
			var populateItem = models.getModel(modelName).populateItem
			if (populateItem){			
				populateItem(doc, next)
			}	else {
				next()
			}
				
		})
	})
	
		
	

}
