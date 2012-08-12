_ = require('underscore')
database = require('./db')
users_provider = require './users-provider'

db = null

exports.setup = (database) ->
	db = database	
	users_provider.setup db
	
	
exports.follow = (follower_id, followed_id, callback)->

	follower_id = database.normalizeID(follower_id)
	followed_id = database.normalizeID(followed_id)	
	
	exports.is_followed follower_id, followed_id, (err, already_followed)->
		unless already_followed
			db.collection 'users', (err, users)->
				users.update { _id : follower_id }, { $push : { follows : followed_id } }, (err)->
					callback(err)
		else
			callback("Already followed")

exports.is_followed = (follower_id, followed_id, callback)->
	follower_id = database.normalizeID(follower_id)
	followed_id = database.normalizeID(followed_id)	
	
	already_followed = false
	exports.fetch follower_id, (err, followed)->
		_.each followed, (followed)->
			if followed.toString() is followed_id.toString()
				already_followed = true
				
		callback(err, already_followed)
					

exports.unfollow = (follower_id, followed_id, callback)->
	follower_id = database.normalizeID(follower_id)
	followed_id = database.normalizeID(followed_id)	
	
	exports.is_followed follower_id, followed_id, (err, is_followed)->	
		if is_followed
			db.collection 'users', (err, users)->
				users.update { _id : follower_id }, { $pull : { follows : followed_id } }, (err)->
					callback(err)
		else
			callback("Not followed")

	
exports.fetch = (follower_id, callback)->

	follower_id = database.normalizeID(follower_id)
	
	db.collection 'users', (err, users)->
		users.findOne { _id : follower_id }, (err, follower)->
			callback(err, follower.follows)
		
