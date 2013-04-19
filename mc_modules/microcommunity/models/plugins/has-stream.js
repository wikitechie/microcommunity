var mongoose = require('mongoose')
	, models = require('./../index')

module.exports = function hasWall(schema, options){

	schema.add({
		stream : { type : mongoose.Schema.Types.ObjectId, ref: 'Stream'}	
	})
	
	//creating a stream object for owner object
	schema.pre('save', function(next){
		var Stream = mongoose.model('Stream')
		var stream = new Stream({})
		var self = this
		stream.save(function(err, stream){
			if (!err){
				self.stream = stream._id
				next(null)
			} else {
				next(new Error('Could not create stream object'))
			}
		})
	})	
	
	//after save
	schema.post('save', function(streamOwner){
		//creating the corresponding dbref		
		var collection = models.convert(streamOwner.objectType, 'object', 'collection')
		var dbref = new mongoose.Types.DBRef(collection, streamOwner.id)
		
		//issuing an update event	
		models.emit('stream:update', streamOwner, dbref)
	})		
	
	models.on('stream:update', function(streamOwner, dbref){
		mongoose.model('Wall')
			.findByIdAndUpdate(streamOwner.stream, { $set : { owner : dbref } }, function(err, item){})	
	})
		
	
}
