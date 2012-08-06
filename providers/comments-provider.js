var database = require('./db')
  , cs = require('coffee-script')
  , users_provider = require('./users-provider')  
  , async = require('async')
  , _ = require('underscore');

var db;

exports.setup = function (database){
	db = database;
};


exports.addComment = function (comment, collection, id, callback){
	db.collection(collection, function(err, collection){
		collection.update(
			{ _id :  database.normalizeID(id) },
			{ $push : { comments: comment } }, 
			function(err) {			
				exports.fetchJoinedComment(comment, function(err, joined_comment){
					callback(err, joined_comment)							
				})
			}
		);	
	})
	
}

exports.fetchJoinedComment = function (comment, callback){
	users_provider.fetch(comment.user, function(err, user){	
		_.extend(comment, {user : user})
		callback(null, comment)	
	})
	
}

exports.fetchJoinedComments = function (comments, callback){
	var functions = [];    		
	var joined_comments = [];
	var j = 0;

	for(var i=0; i< comments.length; i++){
		var comment = comments[i];
		
		function myfunction(callback){		
			comment = comments[j];
			j++;
			
			exports.fetchJoinedComment(comment, function(err, joined_comment){
				joined_comments.push(joined_comment);			
				callback(null);
			});
		}
		functions.push(myfunction);   		    			
	}
	
	async.waterfall(functions, function(err, result){
		callback(null, joined_comments);
	});
}


