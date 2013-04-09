require 'coffee-script'
_ = require('underscore')
database = require('./db')
async = require 'async'

db = null

exports.setup = (mydb) ->
	db = mydb	
	
exports.fetch = (id, callback)->
	id = database.normalizeID(id)
	db.collection 'users', (err, users)->
		users.findOne { _id : id}, (err, user) ->
			exports.fetch_user_data id, (err, data)->	
				_.extend user, data
				callback(err, user)

			
exports.create = (attr, callback)->
	_.extend attr, { objectType : 'user',	published : Date()}
	db.collection 'users', (err, users) ->
		users.insert attr, (err, docs)->
			callback(err, docs[0])
									
						
exports.fetch_user_data = (id, callback)->
	db.collection 'activities', (err, activities)->
		match = 
			verb : "create"
			object_type : "Revision"
			actor : id
		activities.find(match).count (err, wikipages_count)->
			match = 
				verb : "edit"
				object_type : "Revision"
				actor : id					
			activities.find(match).count (err, edit_count)->						
		
				exports.fetch_user_total_upvote id, (err, upvote)->
					exports.fetch_user_followers id, (err, followers)->
						data = 
							#wikipages_count : wikipages_count	
							#edit_count : edit_count
							#reputation : upvote
							#followers : followers
				
						callback(null, data)
							
exports.fetch_user_total_upvote = (id, callback)->
	db.collection 'revisions', (err, revisions)->
		revisions.find({ user : id }).toArray (err, user_revisions)->
			revisions_ids = _.pluck user_revisions, "_id"
			db.collection 'activities', (err, activities)->
				match = 
					verb : 'upvote'
					object_type : 'Revision'
					object : { $in : revisions_ids }
				activities.find(match).count callback
				
exports.fetch_user_followers = (id, callback)->
	id = database.normalizeID(id)	
	db.collection 'users', (err, users) ->
		users.find({ "follows" : id }).count callback

exports.fetchByEmail = (email, callback)->
	db.collection 'users', (err, users)->
		users.findOne { email : email}, (err, user) ->
			callback(err, user)
			
exports.fetchJoinedUsers = (users, callback)->
	functions = []
	joined_users = []
	j = 0
	for user in users 
		myfunction = (callback)->
			user = users[j]
			j++
			exports.fetch user, (err, joined_user)->
				joined_users.push joined_user
				callback(null)
		functions.push(myfunction)
			
	async.waterfall functions, (err, result)->
		callback(null, joined_users)			
			
			
