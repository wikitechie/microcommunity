require 'coffee-script'
_ = require('underscore')
database = require('./db')
wikipages_provider = require './wikipages-provider'
users_provider = require './users-provider'

db = null

exports.setup = (database) ->
	db = database	

exports.fetch = (revision_id, callback) ->
	revision_id = database.normalizeID revision_id
	db.collection 'revisions', (err, revisions)->
		revisions.findOne revision_id, (err, revision)->
			wikipages_provider.fetch revision.page, (err, wikipage) ->
				users_provider.fetch revision.author, (err, author)->
					_.extend revision, { page : wikipage , author : author}
					callback err, revision
					
					
exports.fetchWithoutPage = (revision_id, callback) ->
	revision_id = database.normalizeID revision_id
	db.collection 'revisions', (err, revisions)->
		revisions.findOne revision_id, (err, revision)->
			users_provider.fetch revision.author, (err, author)->
				_.extend revision, {  author : author 	}
				callback err, revision					
