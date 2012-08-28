_ = require('underscore')
database = require('./db')
users_provider = require './users-provider'

db = null

exports.setup = (database) ->
	db = database	
	users_provider.setup db
	
exports.create = (attr, creator_id, callback)->
	creator_id = database.normalizeID(creator_id)
	_.extend attr, { members : [creator_id], admins : [creator_id] }
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
	
