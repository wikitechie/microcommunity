var mongoose = require('mongoose')
	, models = require('./index')

module.exports = function hasWall(schema, options){

	if (!options)
		throw new Error('MicroCommunity Wall Plugin: No options passed')

	if (!options.displayNameAttribute)
		throw new Error('MicroCommunity Wall Plugin: You should provide a displayNameAttribute option')
		
	if (!schema.virtuals.objectType) 
		throw new Error('MicroCommunity Wall Plugin: should have objectType attribute')		

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
		var wall = new Wall({ displayName : this[options.displayNameAttribute] })
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
	
	/* schema.post('save', function(doc){
		models.emit('user:new', doc)
	})	

	models.on('user:new', function(user){
		var owner = new mongoose.Types.DBRef('users', user._id)
		mongoose.model('Wall').findByIdAndUpdate(user.wall, { $set : { owner : owner } }, function(err, wall){
		})
	})*/
	
	//after save
	schema.post('save', function(wallOwner){
		//creating the corresponding dbref
		var collection = models.objectCollectionMatch[wallOwner.objectType]		
		var dbref = new mongoose.Types.DBRef(collection, wallOwner.id)
		
		//issuing an update event	
		models.emit('wall:update', wallOwner, dbref)
	})		
	
	models.on('wall:update', function(wallOwner, dbref){
		console.log('updating wall')
		console.log(wallOwner)
		console.log(dbref)
		mongoose.model('Wall')
			.findByIdAndUpdate(wallOwner.wall, { $set : { owner : dbref } }, function(err, item){})	
	})
		
	
}
