var mongoose = require('mongoose')
	, models = require('microcommunity').models
	, items = require('microcommunity').items		
	, isItem = models.plugins.isItem	

var revisionSchema = new mongoose.Schema({
	content : String,
	summary : String,
	wikipage : { type : mongoose.Schema.Types.ObjectId, ref : 'Wikipage' },
	diff : mongoose.Schema.Types.Mixed
})

revisionSchema.pre('init', function(next, doc){
	this.model('Revision').populate(doc, 'wikipage', next)	
})

revisionSchema.plugin(isItem)

module.exports = revisionSchema
