var Collection = require('./../collection')
	, _ = require('underscore')
	, ObjectId = require('mongodb').ObjectID
	, async = require('async')

function Posts(db){
	var options = {
		joins : {	
			author : 'users',
			wall  : 'users'
		}
	} 
	Collection.call(this, db, 'posts', options)	
}

Posts.prototype = Collection.prototype

module.exports = Posts
