var mongoose = require('mongoose')
  , passport = require('passport')  
  , flash = require('connect-flash')
  , _ = require('underscore')
  , LocalStrategy = require('passport-local').Strategy
  , async = require('async')
  , schemas = require('./../providers/mongoose-schemas'); 

mongoose.connect('mongodb://nodejitsu:ba98acb140bb176fd14db5172894570e@flame.mongohq.com:27086/nodejitsudb841117975789');

exports.index = function(req, res){

	schemas.Post.findById(req.params.id, function(err, post) {
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

	schemas.Post.update(
		{ _id :  mongoose.Types.ObjectId(req.params.id) }, 
		{ $push : {comments: comment } },  
		function(err, post){
			console.log(post + " comments created");
		}
	);	

};



