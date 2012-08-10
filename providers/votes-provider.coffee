_ = require('underscore')
database = require('./db')
activities_provider = require './activities-provider'

db = null

exports.setup = (database) ->
	db = database	
	activities_provider.setup db
	
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
					verb = 'upvote'
				else 
					push =  { down_votes : vote }
					verb = 'downvote'					
					
				collection.update { _id : object_id }, { $push : push }, (err, vote)->
				

					activity = 
						actor: user_id
						verb: verb
						object: object_id
						object_type: 'Revision'
						created_at : new Date()
												
					activities_provider.createActivity activity, (err, new_activity)->
						callback(vote)
						
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


exports.remove_vote = (vote_type, user_id, object_id, collection, callback)->

	user_id = database.normalizeID(user_id)
	object_id = database.normalizeID(object_id)
	
	field = 
		up : "up_votes"
		down : "down_votes"	
	
	if vote_type is 'up'
		pull = { up_votes : { user : user_id } }
		verb = 'upvote'
	else 
		pull = { down_votes : { user : user_id } }
		verb = 'downvote'		
	
	updating = { $pull : pull }
		
	db.collection collection, (err, collection)->						
		collection.update { _id : object_id }, updating, (err)->
			unless err
				db.collection 'activities', (err, activities)->
					match = 
						object : object_id
						actor : user_id
						verb : verb				
					activities.remove match, (err, object)->
						callback(err)
			else 
				callback err


exports.remove_up_vote = (user_id, object_id, collection, callback)->
	exports.remove_vote('up', user_id, object_id, collection, callback)
				
exports.up_vote = (user_id, object_id, collection, callback)->
	exports.vote('up', user_id, object_id, collection, callback)
	
				
exports.down_vote = (user_id, object_id, collection, callback)->
	exports.vote('down', user_id, object_id, collection, callback)
	

exports.fetch_up_votes = (object_id, collection, callback)->
	exports.fetch_votes 'up', object_id, collection, callback
	
exports.fetch_down_votes = (object_id, collection, callback)->
	exports.fetch_votes 'down', object_id, collection, callback
		
		
