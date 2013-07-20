var mongoose = require('mongoose')
	, models = require('microcommunity').models
	, items = require('microcommunity').items
	, isItem = models.plugins.isItem


var commentSchema = new mongoose.Schema({
	content : String,
	author : { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
	published : Date,
	can : {}
})

commentSchema.pre('save', function(next){
	this.published = new Date()
	next()
})

var photoSchema = new mongoose.Schema({
	content: String,
	filePath : String,
	comments : [ commentSchema ]	
})

photoSchema.statics.populateItem = function(doc, next){
	var User = mongoose.model('User')
	User.populate(doc.comments, 'author', next)
}

photoSchema.plugin(isItem, { objectType : 'photo' })

Photo = models.define('Photo', 'photo', 'items', photoSchema)
items.addItem('Photo', 'models/items/photo')

