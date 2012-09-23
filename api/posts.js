var provider = require('./../providers/posts-provider')
	, database = require('./../providers/db')

	
exports.index = function(req, res){
	provider.fetchPosts(function(err, posts){
		return res.send(posts);	
	});
};

exports.create = function(req, res){

	var post = {
    text: req.body.text,
    user: database.normalizeID(req.body.user._id),
    created_at : Date(),
    parent : database.normalizeID(req.body.parent._id),
    parent_type : req.body.parent_type
	};	
  
  provider.createPost(post, function(err, new_post){
	  return res.send(new_post);     
  });	  
};

exports.show = function(req, res){
	provider.fetch(req.params.post, function(err, joined_post){
		return res.send(joined_post); 	
	});  
}

