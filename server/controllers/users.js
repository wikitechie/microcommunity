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
				if(user) {
				callback(new Error('user already exists'))
				} else {
					db.getCollection('users').create(attr, function(err, user){
						if (!err){
							callback(null, user)
						}
					})
				}			
			})	
		},
		//creating the wall document and updating the user document accordingly
		function(user, callback){
			db.getCollection('walls').create({}, function(err, wall){
				if (!err){
					db.getCollection('users').updateAttr( 
						user._id.toString(), { 'wall' : wall._id },
						function(err){
							if(!err)
							callback(null, user)
						})				
				}
			})		
		},
		//fetching the updated user document
		function ( user, callback){
			db.getCollection('users').findById(user._id.toString(), function(err, user){
				callback(err, user)
			})			
		}	
	//returning final result		
	], function(err, user){	
		controllerCallback(err, user)	
	})


}
