var mongoose = require('mongoose')
	, _ = require('underscore')

module.exports = function Itemable(schema, options){

	//if (!schema.virtuals.objectType) throw new Error ('Itemable: should have objectType attribute')
	
	//if (!options) throw new Error('MicroCommunity Item Plugin: you should pass options')
	//if (!options.clientPath) throw new Error('MicroCommunity Item Plugin: you should pass clientPath option')	

	schema.add({
		author : { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
		wall : { type : mongoose.Schema.Types.ObjectId, ref : 'Wall' },		
		walls : [{ type : mongoose.Schema.Types.ObjectId, ref : 'Wall' }],
		streams : [{ type : mongoose.Schema.Types.ObjectId, ref : 'Stream' }],		
		item : mongoose.Schema.Types.ObjectId,	
		published : Date			
	})
	
	//adding published attribute
	schema.pre('save', function(next){
		this.published = new Date()
		next()
	})	
	
	//populating options
	schema.pre('init', function(next, doc){	
		var objectType = schema.virtuals.objectType.getters[0]()		
		var modelName = models.convert(objectType, 'object', 'model')
		this.model(modelName).populate(doc, 'author wall', next)
	})
	
	//before save, adding the wall item
	schema.pre('save', function(next){
		var self = this
		this.model('User').findById(self.author, function(err, author){
			var Item = mongoose.model('Item')		
			var item = new Item({ 
				wall : self.wall,
				walls : self.walls,		
				streams : self.streams,						 
				published : self.published
			})
			item.save(function(err, item){
				if (!err){
					self.item = item._id
					next(null)
				} else {
					throw new Error('Could not create item object')
				}
			})		
		})
	})
	
	var models = require('./../../models')	

	//after save
	schema.post('save', function(itemable){
		//creating the corresponding dbref		
		var collection = models.convert(itemable.objectType, 'object', 'collection')		
		var dbref = new mongoose.Types.DBRef(collection, itemable._id)
		
		//issuing an update event	
		models.emit('item:update', itemable, dbref)
	})		
	
	models.on('item:update', function(itemable, dbref){
		mongoose.model('Item')
			.findByIdAndUpdate(itemable.item, { $set : { object : dbref } }, function(err, item){})	
	})

}
