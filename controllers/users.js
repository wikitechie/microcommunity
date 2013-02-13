var db = require('./../db/db')
	, async = require('async')
	
/*
	users controller
*/

exports.create = function(attr, controllerCallback){

	async.waterfall([
		//creating the user document if the user does not already exist
		function (callback){
			db.getCollection('users').findByEmail(attr.email, function(err, user){			
				if (user) {
				callback(new Error('user already exists'))
				} else {
					db.getCollection('users').create(attr, function(err, new_user){
						callback(err, new_user)
					})
				}			
			})	
		},
		//creating the wall document and updating the user document accordingly
		function(created_user, callback){
			db.getCollection('walls').create({}, function(err, wall){
				if (err){
					callback(err)
				} else {
					db.getCollection('users').updateAttr( created_user._id.toString(), { 'wall' : wall._id },
						callback)				
				}
			})		
		},
	//returning final result		
	], function(err, user){	
		controllerCallback(err, user)	
	})
}

exports.findById = function(id, callback){
	db.getCollection('users').findById(id, callback)	
}

exports.findByEmail = function(email, callback){
	db.getCollection('users').findByEmail(email, callback)	
}

exports.fetchWall = function(user_id, callback){
	exports.findById(user_id, function(err, user){
		wall_id = user.wall		
		db.getCollection('wallItems').fetchWall( user.wall, function(err, wallItems){
			callback(null, wallItems)		
		})	
	})
}


