var provider = require('./../providers/posts-provider')
	,	activity_provider = require('./../providers/activities-provider')
	, database = require('./../providers/db')

var postsController = require('./../controllers/posts')

var validate = function(attr){
	if (attr.content === ""){
		return false
	}
}
 
var count = 1
	 
exports.create = function(req, res){
	
	var post = {
		id : count++,
		content : req.body.content,
		author : req.body.author,
		wall : req.body.wall,
		createdAt : Date()		
	}
	
	postsController.create(
			post.content,
			post.author._id,
			post.wall,
	function(err, wallItem){
		console.log(wallItem)	
	})
	
	res.send(post)
		
}

exports.update = function(req, res){
	console.log(req.body)
}
 
/* 
exports.create = function(req, res){

	var post = {
    content: req.body.content,
    author: req.body.author, 
    parent : req.body.parent
	};		  
	
	if(validate(post) != false){
		provider.create(post, function(err, new_post){		
		
			var activity = {
				actor: database.normalizeID(req.body.author),
				verb: 'create',
				object: database.normalizeID(new_post._id),
				object_type: "Post",
				target: database.normalizeID(req.body.parent._id),
				target_type: 'users',    
				created_at : new Date() 
			};

			activity_provider.createActivity(activity, function(err, new_activity){
				return res.send({
					activity : new_activity
				});     
			});	  		

		});	 
		 	
	} else {
	  res.send(500, 'Something broke!');
	}
  
}; */

