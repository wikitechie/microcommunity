var mongoose = require('mongoose')
  , async = require('async')
  , comments_provider = require('./comments-provider')
  , schemas = require('./../providers/mongoose-schemas'); 

mongoose.connect('mongodb://localhost/microcommunity');

exports.fetchJoinedPost = function (post, callback){
	schemas.Post.findById(post, function(err, post) {
  	schemas.User.findById(post.user, function(err, user){
  		comments_provider.fetchJoinedComments(post.comments, function(err, joined_comments){  		
				var joined_post = {
					_id  : post._id,
					name : post.name,
					text : post.text,
					user : user,
					created_at : post.created_at,
					comments: joined_comments
				};				
				callback(null, joined_post);		  	 		
  		})  
  	})   	
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
			
			exports.fetchJoinedPost(post, function(err, joined_post){
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
  var post = new schemas.Post(attr);
  post.save(function(err) {
  	exports.fetchJoinedPost(post, function(err, post){
  		callback(err, post);
  	});
  
  	
  });
}
