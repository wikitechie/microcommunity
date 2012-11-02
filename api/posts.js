var provider = require('./../providers/posts-provider')

exports.create = function(req, res){

	var post = {
    content: req.body.content,
    author: req.body.author, 
    parent : req.body.parent
	};		  
	
  provider.create(post, function(err, new_post){
	  return res.send(new_post);     
  });	  
};

