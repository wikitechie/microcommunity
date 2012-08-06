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

	var post = database.normalizeID(id);
	db.collection('posts', function(err, posts){
		posts.findOne( { _id : post }, function(err, post){
			users_provider.fetch(post.user, function(err, user){
	  		comments_provider.fetchJoinedComments(post.comments, function(err, joined_comments){
	  			_.extend(post, { user : user, comments : joined_comments})	 
	  			callback(err, post)
	  		}) 						
			})			
		})	
	})	
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

exports.fetchPosts = function (callback){
  schemas.Post.find(function(err, posts) {	
		if(!err){
			exports.fetchJoinedPosts(posts, function(err, joined_posts){
				callback(err, joined_posts);											
			});
		}
});

}


exports.createPost = function(attr, callback){

	_.extend(attr, {comments : []})

	db.collection('posts', function(err, posts){
		posts.insert(attr, function(err, docs){
			exports.fetch(docs[0]._id, function(err, new_post){
				callback(err, new_post);
			})
		});
	});

}

