var mongoose = require('mongoose')
	, models = require('microcommunity').models
	, items = require('microcommunity').items	
	, isItem = models.plugins.isItem

var commentSchema = new mongoose.Schema({
	content : String,
	author : { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
	published : Date
})

commentSchema.pre('save', function(next){
	this.published = new Date()
	next()
})

var postSchema = new mongoose.Schema({
	content: String,
	comments : [ commentSchema ]
})

//comments populating options
postSchema.pre('init', function(next, doc){	
	var User = mongoose.model('User')
	User.populate(doc.comments, 'author', next)
})


postSchema.plugin(isItem)

models.define('Post', 'post', 'posts', postSchema)
items.addItem('Post', 'models/items/post')
