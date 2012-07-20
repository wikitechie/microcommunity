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
  return Post.find(function(err, posts) {
	
	if(!err){
	
		var userIds = _.pluck(posts, "user");
		
		User.find({ _id : { $in : userIds } }, function(err, users){
			var map = {};
			_.each(users, function(u){
				map[u.id] = u;
			});
			
			var joinedposts = [];
			var joinedpost = {};
			var functions = []; 			
			
			_.each(posts, function(p){  			
			
				function myfunction(callback) {
					var user = {
						_id : map[p.user]._id,
						email: map[p.user].email  				  				
					};  				
					
					var functions = [];    		
	  			var final_comments = [];
	  			var j = 0;
	  	
					for(var i=0; i< p.comments.length; i++){

						function myfunction(callback){							
							comment = p.comments[j];
							j++;
						
							User.findById(comment.user, function(err, user){
								var joinedcomment = {
									text : comment.text,
									name : comment.name,
									_id  : comment._id,
									user : user,
									created_at : comment.created_at
								};
							
								final_comments.push(joinedcomment);		
							
								callback(null);
							
							});    			
						}    			
						functions.push(myfunction);   		    			
					}
	  		
					async.waterfall(functions, function(err, result){
						var joinedpost = {
							_id  : p._id,
							name : p.name,
							text : p.text,
							user : user,
							created_at : p.created_at,
							comments: final_comments
						};
				  	joinedposts.push(joinedpost);     			
				  	callback(null);
					});
					
	  		  				
				}
				
				functions.push(myfunction);  						
			});
			
			async.waterfall(functions, function(err, result){
				return res.send(joinedposts);					
			});	
			
			
		});

	}

});
};

exports.new = function(req, res){
  res.send('new post');
};

exports.create = function(req, res){
	console.log(req.body);
  
  var post;
  post = new Post({
    text: req.body.text,
    name: req.body.name,
    user: mongoose.Types.ObjectId(req.body.user._id),
    created_at : req.body.created_at
  });
  
  console.log(post	);
  post.save(function(err) {
    if (!err) {
      return console.log("created");
    }
  });
  
	var joinedpost = {
		_id  : post._id,
		name : post.name,
		text : post.text,
		user : req.body.user,
		created_at : post.created_at
	};
  return res.send(joinedpost);    	
  
};

exports.show = function(req, res){
	console.log(req.params);
  return Post.findById(req.params.post, function(err, post) {
    if (!err) {
    	User.findById(post.user, function(err, user){
    	
    		var functions = [];    		
    		var final_comments = [];
    		var j = 0;
    	
    		for(var i=0; i< post.comments.length; i++){
    			var comment = post.comments[i];
    			
    			function myfunction(callback){
    			
    				comment = post.comments[j];
    				j++;
		  			
		  			User.findById(comment.user, function(err, user){
		  				var joinedcomment = {
		  					text : comment.text,
		  					name : comment.name,
		  					_id  : comment._id,
		  					user : user,
		  					created_at: comment.created_at
		  				};
		  				
		  				final_comments.push(joinedcomment);		
		  				
		  				callback(null);
		  				
		  			});    			
    			}
    			functions.push(myfunction);   		    			
    		}
    		
    		async.waterfall(functions, function(err, result){
	    		var joinedpost = {
		  			_id  : post._id,
		  			name : post.name,
		  			text : post.text,
		  			user : user,
		  			created_at : post.created_at,
		  			comments: final_comments
    			};
	      	return res.send(joinedpost);     			
    		});    		
   	
    	});
    }
  });
};

exports.edit = function(req, res){
	res.send('edit post ' + req.params.post);
};

exports.update = function(req, res){
   return Post.findById(req.params.post, function(err, post) {
    post.text = req.body.text;
    post.name = req.body.name;
    return post.save(function(err) {
      if (!err) {
        console.log("updated");
      }
      return res.send(post);
    });
  });
};

exports.destroy = function(req, res){
  res.send('destroy post ' + req.params.post);
};
