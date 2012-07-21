var mongoose = require('mongoose')
  , async = require('async');

mongoose.connect('mongodb://localhost/microcommunity');


var Post = mongoose.model('Post', new mongoose.Schema({
	user: mongoose.Schema.ObjectId, 
  name: String,
  text: String,
  comments : [Comments],
  created_at : Date
}));

var Comments = new mongoose.Schema({
    name     : String
  , text      : String
  , user : mongoose.Schema.ObjectId
  , created_at : Date
});


var User = mongoose.model('User', new mongoose.Schema({
	email: String,
	password: String
}));

exports.fetchJoinedComment = function (comment, callback){
		User.findById(comment.user, function(err, user){
			var joinedcomment = {
				text : comment.text,
				name : comment.name,
				_id  : comment._id,
				user : user,
				created_at: comment.created_at
			};			
			callback(null, joinedcomment);						
		}); 
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


