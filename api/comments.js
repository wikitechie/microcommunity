var mongoose = require('mongoose')
  , passport = require('passport')  
  , flash = require('connect-flash')
  , _ = require('underscore')
  , LocalStrategy = require('passport-local').Strategy
  , async = require('async')
  , schemas = require('./../providers/mongoose-schemas')
  , comments_provider = require('./../providers/comments-provider'); 

mongoose.connect('mongodb://localhost/microcommunity');


exports.create = function(req, res){

	var comment = {
		text : req.body.text,
		name : req.body.name,
		user : req.body.user._id,
		created_at : req.body.created_at
	};

	schemas.Post.update(
		{ _id :  mongoose.Types.ObjectId(req.params.id) }, 
		{ $push : {comments: comment } },  
		function(err, post){
			console.log(post + " comments created");
		}
	);	

};



