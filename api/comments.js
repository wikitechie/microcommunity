var  passport = require('passport')  
  , flash = require('connect-flash')
  , _ = require('underscore')
  , LocalStrategy = require('passport-local').Strategy
  , async = require('async')
  , schemas = require('./../providers/mongoose-schemas')
  , database = require('./../providers/db')
  , comments_provider = require('./../providers/comments-provider'); 



exports.setup = function(database) {
	comments_provider.setup(database)
}

exports.create = function(req, res){

	var comment = {
		text : req.body.text,
		user : database.normalizeID(req.body.user._id),
		created_at : new Date()
	};	
	

	comments_provider.addComment(comment, 'posts', req.params.id, function(err, c){
		res.send(c)
	})

};



