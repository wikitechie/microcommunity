var mongoose = require('mongoose')

module.exports = function hasWall(schema, options){

	schema.add({
		stream : { type : mongoose.Schema.Types.ObjectId, ref: 'Stream'}	
	})
	

	schema.pre('save', function(next){
	
		if (this.isNew){
			var Stream = mongoose.model('Stream')	
			var models = require('./../../models')	
			var collection = models.convert(this.objectType, 'object', 'collection')
			var dbref = new mongoose.Types.DBRef(collection, this.id)		
		
			var stream = new Stream({ 
				owner : dbref
			})
		
			var self = this
			stream.save(function(err, stream){
				if (!err){
					self.stream = stream.id
					next(null)
				} else {
					next(new Error('Could not create stream object'))
				}
			})		
		
		} else {
			next()
		}

	})	
		
	

	
}
