var provider = require('./../providers/posts-provider'),
    mongoose = require('mongoose'); 

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
    created_at : req.body.created_at
	};
  
  provider.createPost(post, function(err){
	  return res.send({status: "ok"});     
  });	  
};


exports.show = function(req, res){
	provider.fetchJoinedPost(req.params.post, function(err, joined_post){
		return res.send(joined_post); 	
	});  
}


