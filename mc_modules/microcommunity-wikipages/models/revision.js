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

revisionSchema.statics.populateItem = function(doc, next){
	models.model('Revision').populate(doc, 'wikipage', next)	
}

revisionSchema.plugin(isItem, {objectType : 'revision' })

module.exports = revisionSchema
