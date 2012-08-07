_ = require('underscore')
database = require('./db')

db = null

exports.setup = (database) ->
	db = database	
	
exports.vote = (vote_type, user_id, object_id, collection, callback)->
	
	user_id = database.normalizeID(user_id)
	object_id = database.normalizeID(object_id)

	vote = 
		user : user_id
		created_at : new Date()
		
	exports.fetch_votes vote_type, object_id, collection, (err, votes)->	
		voted = false
		_.each votes, (vote)->
			if vote.user.toString() is user_id.toString()
				voted = true
				
		unless voted
			db.collection collection, (err, collection)->
				if vote_type is 'up'
					push =  { up_votes : vote }
				else 
					push =  { down_votes : vote }
					
				collection.update { _id : object_id }, { $push : push }, (err)->
					callback(err)
		else
			callback
				error : "Already voted"

exports.fetch_votes = (vote_type, object_id, collection, callback)->
	object_id = database.normalizeID(object_id)	
	
	field = 
		up : "up_votes"
		down : "down_votes"
	
	db.collection collection, (err, collection)->	
		collection.findOne { _id : object_id }, (err, object)->
			callback(err, object[field[vote_type]])

				
exports.up_vote = (user_id, object_id, collection, callback)->
	exports.vote('up', user_id, object_id, collection, callback)
	
				
exports.down_vote = (user_id, object_id, collection, callback)->
	exports.vote('down', user_id, object_id, collection, callback)
	

exports.fetch_up_votes = (object_id, collection, callback)->
	exports.fetch_votes 'up', object_id, collection, callback
	
exports.fetch_down_votes = (object_id, collection, callback)->
	exports.fetch_votes 'down', object_id, collection, callback
		
		
