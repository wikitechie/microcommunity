var mongoose = require('mongoose')
	, models = require('./../index')
	, _ = require('underscore')

module.exports = function Itemable(schema, options){

	if (!schema.virtuals.objectType) throw new Error ('Itemable: should have objectType attribute')

	schema.add({
		author : { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
		wall : { type : mongoose.Schema.Types.ObjectId, ref : 'Wall' },
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
		var modelName = models.objectModelMatch[objectType]
		this.model(modelName).populate(doc, 'author wall', next)
	})		
	
	//before save
	schema.pre('save', function(next){
		var Item = mongoose.model('Item')		
		var item = new Item({ wall : this.wall, published : this.published })
		var self = this
		item.save(function(err, item){
			if (!err){
				self.item = item._id
				next(null)
			} else {
				throw new Error('Could not create item object')
			}
		})
	})
	

	//after save
	schema.post('save', function(itemable){
		//creating the corresponding dbref
		var collection = models.objectCollectionMatch[itemable.objectType]		
		var dbref = new mongoose.Types.DBRef(collection, itemable._id)
		
		//issuing an update event	
		models.emit('item:update', itemable, dbref)
	})		
	
	models.on('item:update', function(itemable, dbref){
		mongoose.model('Item')
			.findByIdAndUpdate(itemable.item, { $set : { object : dbref } }, function(err, item){})	
	})
	
	//itemType virtual	
	schema.virtual('itemType').get(function(){ return this.objectType })
	

}
