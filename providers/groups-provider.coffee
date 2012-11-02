_ = require('underscore')
database = require('./db')
users_provider = require './users-provider'
async = require 'async'

db = null

exports.setup = (database) ->
	db = database	
	users_provider.setup db
	
exports.create = (attr, creator_id, callback)->
	creator_id = database.normalizeID(creator_id)
	_.extend attr, 
		members : [creator_id]
		admins : [creator_id]
		published : Date()
	db.collection 'groups', (err, groups)->
		groups.insert attr, (err, docs)->
			callback(err, docs[0])

exports.fetch = (group_id, callback)->
	group_id = database.normalizeID(group_id)
	db.collection 'groups', (err, groups)->
		groups.findOne { _id : group_id }, (err, group)->
			users_provider.fetchJoinedUsers group.members, (err, members)->
				users_provider.fetchJoinedUsers group.admins, (err, admins)->
					_.extend group, 
						members : members
						admins : admins
					callback(err, group)
	
exports.fetchAll = (from, to, callback)->
	db.collection 'groups', (err, groups)->
		groups.find()
		.sort({created_at: -1})
		.skip(parseInt(from))
		.limit(parseInt(to))
		.toArray (err, result)->
			console.log(result)
			exports.fetchJoinedGroups result, (err, result)->
				callback(err, result)
				
exports.fetchJoinedGroups = (groups, callback)->
	functions = []
	joined_groups = []
	j = 0
	for group in groups 
		myfunction = (callback)->
			group = groups[j]
			j++
			exports.fetch group._id, (err, joined_group)->
				joined_groups.push joined_group
				callback(null)
		functions.push(myfunction)
			
	async.waterfall functions, (err, result)->
		callback(null, joined_groups)			
							
				
