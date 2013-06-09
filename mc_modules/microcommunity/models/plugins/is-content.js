var mongoose = require('mongoose')

module.exports = function isContainer(schema, options){
	
	schema.add({
		container: { type : mongoose.Schema.Types.ObjectId, ref : 'Container' }
	})
	
	schema.pre('init', function(next, doc){
		this.model('Container').populate(doc, 'container', next)	
	})
	
}
