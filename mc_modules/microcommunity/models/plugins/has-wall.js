var mongoose = require('mongoose')

module.exports = function hasWall(schema, options){

	if (!options)
		throw new Error('MicroCommunity Wall Plugin: No options passed')

	if (!options.displayNameAttribute)
		throw new Error('MicroCommunity Wall Plugin: You should provide a displayNameAttribute option')
		
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
	schema.pre('save', function(next){
		var Wall = mongoose.model('Wall')
		var wall = new Wall()
		var self = this
		wall.save(function(err, wall){
			if (!err){
				self.wall = wall._id
				next(null)
			} else {
				next(new Error('Could not create wall object'))
			}
		})
	})	
	
	var models = require('./../../models')
	
	//after save
	schema.post('save', function(wallOwner){
		//creating the corresponding dbref		
		var collection = models.convert(wallOwner.objectType, 'object', 'collection')
		var dbref = new mongoose.Types.DBRef(collection, wallOwner.id)
		
		//issuing an update event	
		models.emit('wall:update', wallOwner, dbref)
	})		
	
	models.on('wall:update', function(wallOwner, dbref){
		mongoose.model('Wall')
			.findByIdAndUpdate(wallOwner.wall, { $set : { 
				owner : dbref,
				displayName : wallOwner[options.displayNameAttribute]
			} }, function(err, item){})	
	})
		
	
}
