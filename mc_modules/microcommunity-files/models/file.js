var mongoose = require('mongoose')
	, models = require('microcommunity/models/index')

var fileSchema = new mongoose.Schema({
	name: String,
	description : String,
	material : { type : mongoose.Schema.Types.ObjectId, ref : 'Material' },	
})

fileSchema.pre('init', function(next, doc){
	this.model('Material').populate(doc, 'material', next)	
})

models.define('File', 'file', 'files', fileSchema)
