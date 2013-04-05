var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
	content: String,
	author : { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
	wall : mongoose.Schema.Types.ObjectId,
	createdAt : Date
})

postSchema.pre('init', function(next, doc){
	this.model('Post').populate(doc, { path : 'author' }, next)
})


var Post = mongoose.model('Post', postSchema);

