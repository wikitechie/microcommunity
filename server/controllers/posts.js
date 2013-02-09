var db = require('./../db/db')
	, async = require('async')
	, usersController = require('./users')
	
exports.create = function(
	content,
	author_id,
	wall_id, controllerCallback){	
	
	async.waterfall([
	
		//checking if user exists
		function(callback){
			usersController.findById(author_id, function(err, user){
				if (user){
					callback(null)
				} else {
					callback(new Error("User does not exist"))
				}
				})
		},
				
		//creating post
		function(callback){
			//manipulating parameters
			author_id = db.mongo.ObjectID(author_id)

			wall_id = db.mongo.ObjectID(wall_id)	
			post = {
				content : content,
				author : author_id,
				wall : wall_id
			}
				
			db.getCollection('posts').create(post, function(err, new_post){
				callback(err, new_post)			
			})							
		},
		
		//creating wall item
		function(new_post, callback){		
			object = db.mongo.DBRef('posts', new_post._id)			
			wall_item = {
				updated: new Date(),
				object : object,
				wall : wall_id			
			}				
			db.getCollection('wallItems').create(wall_item, function(err, wallItem){		
				db.db.dereference(wallItem.object, function(err, object){
					wallItem.object = object
					callback(null, wallItem)
				})				
			})				
		},
	
	], function(err, wallItem){	
		controllerCallback(null, wallItem)	
	})
		
	
}
