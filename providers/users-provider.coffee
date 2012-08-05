require 'coffee-script'
_ = require('underscore')
database = require('./db')

db = null

exports.setup = (database) ->
	db = database	
	
exports.fetch = (id, callback)->
	id = database.normalizeID(id)
	db.collection 'users', (err, users)->
		users.findOne { _id : id}, (err, user) ->
			callback(err, user)
			
exports.create = (attr, callback)->
	db.collection 'users', (err, users) ->
		users.insert attr, (err, docs)->
			callback(err, docs[0])
			
exports.fetchByEmail = (email, callback)->
	db.collection 'users', (err, users)->
		users.findOne { email : email}, (err, user) ->
			callback(err, user)
