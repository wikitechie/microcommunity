var mongoose = require('mongoose')

module.exports = function hasComments(schema, options){
	
	
	var commentSchema = new mongoose.Schema({
		content : String,
		author : { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
		published : Date
	})

	commentSchema.pre('save', function(next){
		this.published = new Date()
		next()
	})
	
	
	schema.add({
		container: { type : mongoose.Schema.Types.ObjectId, ref : 'Container' }
	})
	
	schema.pre('init', function(next, doc){
		this.model('Container').populate(doc, 'container', next)	
	})
	
}
