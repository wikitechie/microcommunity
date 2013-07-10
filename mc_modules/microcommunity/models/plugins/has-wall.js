var mongoose = require('mongoose')

module.exports = function hasWall(schema, options){

	if (!options)
		throw new Error('MicroCommunity Wall Plugin: No options passed')

	if (!options.displayNameAttribute)
		throw new Error('MicroCommunity Wall Plugin: You should provide a displayNameAttribute option')
		
	if (!options.wallType)
		throw new Error('MicroCommunity Wall Plugin: You should provide a wallType option')		
		
	var wallType = options.wallType
	var displayNameAttribute = options.displayNameAttribute
		
	//if (!schema.virtuals.objectType) 
		//throw new Error('MicroCommunity Wall Plugin: should have objectType attribute')		

	schema.add({
		wall : { type : mongoose.Schema.Types.ObjectId, ref: 'Wall'}	
	})	
	
	//populating options
	schema.pre('init', function(next, doc){	
		var Wall = mongoose.model('Wall')
		Wall.populate(doc, 'wall', function(err, doc){
			next(err, doc)
		})
	})		
	
	//creating a wall object for each wall
	schema.pre('save', function(next, doc){
		var Wall = mongoose.model('Wall')
		
		var collection = models.convert(this.objectType, 'object', 'collection')
		var dbref = new mongoose.Types.DBRef(collection, this.id)		
		
		var wall = new Wall({ 
			owner : dbref,
			displayName : this[displayNameAttribute],
			wallType : wallType
		})		
		
		var self = this
		wall.save(function(err, wall){
			if (!err){
				self.wall = wall.id
				next(null)
			} else {
				next(new Error('Could not create wall object'))
			}
		})
	})	
	
	var models = require('./../../models')
		
	
}
