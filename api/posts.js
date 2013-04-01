var postsController = require('./../controllers/posts')

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


