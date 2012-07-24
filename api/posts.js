var provider = require('./../providers/posts-provider')
	, schemas = require('./../providers/mongoose-schemas')
	, mongoose = require('mongoose');
	
exports.index = function(req, res){
	provider.fetchPosts(function(err, posts){
		return res.send(posts);	
	});
};

exports.create = function(req, res){

	var post = {
    text: req.body.text,
    name: req.body.name,
    user: mongoose.Types.ObjectId(req.body.user._id),
    created_at : Date()
	};
  
  provider.createPost(post, function(err, new_post){
  	console.log(new_post);
	  return res.send(new_post);     
  });	  
};


exports.show = function(req, res){
	provider.fetch(req.params.post, function(err, joined_post){
		return res.send(joined_post); 	
	});  
}

