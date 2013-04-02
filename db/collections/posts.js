var Collection = require('./../collection')
	, _ = require('underscore')
	, ObjectId = require('mongodb').ObjectID
	, async = require('async')

function Posts(db){

	var options = {	
		relations : [		
			{
				type : 'singleRef',
				field: 'author', 
				collection: 'users' 
			}, 			
			{
				type : 'arrayDescriptor',
				field : 'comments', 
				singleRefs : [
					{ field : 'author', collection : 'users' }
				]
			},
			{
				type : 'multiRef', 
				field : 'follows', 
				collection : 'users' 
			}		
		]
	}

	Collection.call(this, db, 'posts', options)	
}

Posts.prototype = Collection.prototype

_.extend(Posts.prototype, {
	addComment : function(id, comment, callback){
		this.update({ _id : ObjectId(id) }, { $push : { comments: comment } }, function(err, nb){
			if(err) throw err		
			callback(null)
		})
	},
	addJoke : function(id, joke, callback){
		this.update({ _id : ObjectId(id) }, { $push : { jokes: joke } }, function(err, nb){
			if(err) throw err		
			callback(null)
		})
	},
	follow : function(id, stream, callback){
		this.update({ _id : ObjectId(id) }, { $push : { follows: ObjectId(stream) } }, function(err, nb){
			if(err) throw err		
			callback(null)
		})	
	}
})

module.exports = Posts
