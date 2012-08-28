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

