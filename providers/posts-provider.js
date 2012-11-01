var async = require('async')
  , comments_provider = require('./comments-provider')
  , users_provider = require('./users-provider')
  , database = require('./db')
  , _ = require('underscore'); 

var db;

exports.setup = function (database){
	db = database;
	users_provider.setup(database);
};

exports.fetch = function (id, callback){

	var id = database.normalizeID(id);
	
	db.collection('posts', function(err, posts){
		posts.findOne( { _id : id }, function(err, post){
			users_provider.fetch(post.author, function(err, author){
	  		comments_provider.fetchJoinedComments(post.comments, function(err, joined_comments){
	  			_.extend(post, { 
	  				author : author, 
	  				comments : joined_comments
  				})	 
	  			callback(err, post)
	  		}) 						
			})			
		})	
	})	
}


exports.create = function(attr, callback){

	attr.author = database.normalizeID(attr.author)
	attr.parent._id = database.normalizeID(attr.parent._id)

	_.extend(attr, {comments : []})
	
	db.collection('posts', function(err, posts){
		posts.insert(attr, function(err, docs){
			exports.fetch(docs[0]._id, function(err, new_post){
				callback(err, new_post);
			})
		});
	});

}


exports.fetchJoinedPosts = function (posts, callback){
	var functions = [];    		
	var joined_posts = [];
	var j = 0;

	for(var i=0; i< posts.length; i++){
		var post = posts[i];
		
		function myfunction(callback){		
			post = posts[j];
			j++;
			
			exports.fetch(post, function(err, joined_post){
				joined_posts.push(joined_post);			
				callback(null);
			});
		}
		functions.push(myfunction);   		    			
	}
	
	async.waterfall(functions, function(err, result){
		callback(null, joined_posts);
	});
}


