var Collection = require('./../collection')
	, _ = require('underscore')
	, ObjectId = require('mongodb').ObjectID
	, async = require('async')

function Posts(db){
	var options = {	
		//direct references fields in the collection documents
		singleRefs : [ 
			{ field: 'author', collection: 'users' }, 
			{ field: 'wall', collection: 'users' }
		],				
		//array of references		
		multiRefs : [
			{ field : 'follows', collection : 'users' }
		],		
		//references in arrays of embeded documents 
		arrayDescriptors : [
			{ field : 'comments', singleRefs : [
				{ field : 'author', collection : 'users' }
			]},
			{ field : 'jokes', singleRefs : [
				{ field : 'author', collection : 'users' }
			]}			
		]
	} 
	
	Collection.call(this, db, 'posts', options)	
}

Posts.prototype = Collection.prototype

Posts.prototype.addComment = function(id, comment, callback){
	this.update({ _id : ObjectId(id) }, { $push : { comments: comment } }, function(err, nb){
		if(err) throw err		
		callback(null)
	})
}

Posts.prototype.addJoke = function(id, joke, callback){
	this.update({ _id : ObjectId(id) }, { $push : { jokes: joke } }, function(err, nb){
		if(err) throw err		
		callback(null)
	})
}

Posts.prototype.follow = function(id, stream, callback){
	this.update({ _id : ObjectId(id) }, { $push : { follows: ObjectId(stream) } }, function(err, nb){
		if(err) throw err		
		callback(null)
	})	
}

//Posts.prototype.fetchById

module.exports = Posts
