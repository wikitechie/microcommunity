var mongoose = require('mongoose')
	, models = require('./index')

var postSchema = new mongoose.Schema({
	content: String,
	author : { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
	wall : mongoose.Schema.Types.ObjectId,
	item : mongoose.Schema.Types.ObjectId,	
	published : Date
})

postSchema.pre('init', function(next, doc){
	this.model('Post').populate(doc, { path : 'author' }, next)
})

postSchema.pre('save', function(next){
	this.published = new Date()
	next()
})

//creating an item object for each post
postSchema.pre('save', function(next){
	var Item = mongoose.model('Item')		
	var item = new Item({ wall : this.wall })
	var self = this
	item.save(function(err, item){
		if (!err){
			self.item = item._id
			next(null)
		} else {
			next(new Error('Could not create item object'))
		}
	})
})

postSchema.post('save', function(doc){
	models.emit('post:new', doc)
})

postSchema.virtual('itemType').get(function(){ return 'post' })

var Post = mongoose.model('Post', postSchema);

