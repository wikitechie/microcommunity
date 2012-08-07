_ = require('underscore')
database = require('./db')

db = null

exports.setup = (database) ->
	db = database	
	
exports.up_vote = (user_id, object_id, collection, callback)->

	user_id = database.normalizeID(user_id)
	object_id = database.normalizeID(object_id)

	vote = 
		user : user_id
		created_at : new Date()

	db.collection collection, (err, collection)->
		collection.update { _id : object_id }, { $push : { up_votes : vote } }, (err)->
			callback(err)
			
	
