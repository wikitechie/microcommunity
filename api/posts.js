var provider = require('./../providers/posts-provider')

exports.create = function(req, res){
	var post = {
    content: req.body.content,
    author: req.body.author,
    published : Date(),
    parent : req.body.parent,
    objectType : 'post'
	};		  
  provider.create(post, function(err, new_post){
	  return res.send(new_post);     
  });	  
};

