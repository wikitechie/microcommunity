var mongoose = require('mongoose')
  , passport = require('passport')  
  , flash = require('connect-flash')
  , _ = require('underscore')
  , LocalStrategy = require('passport-local').Strategy
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


exports.index = function(req, res){

	Post.findById(req.params.id, function(err, post) {
		if (!err) {
			return res.send(post.comments);
		}
	});

};


exports.create = function(req, res){

	var comment = {
		text : req.body.text,
		name : req.body.name,
		user : req.body.user._id,
		created_at : req.body.created_at
	};

	Post.update(
		{ _id :  mongoose.Types.ObjectId(req.params.id) }, 
		{ $push : {comments: comment } },  
		function(err, post){
			console.log(post);
		}
	);	

};



