process.env.NODE_ENV = 'test';

assert = require("assert")
groups_provider = require('./../../providers/groups-provider')
database = require('./../../providers/db')
users_provider = require('./../../providers/users-provider')

db = null

resetDB = (callback)->
	db.collection 'groups', (err, docs)->
		docs.remove {}, ()->
			db.collection 'users', (err, docs)->
				docs.remove {}, ()->
					callback()


describe 'Groups Provider', ()->

	before (done)->
		database.connectDB (err, database)->
			db = database
			groups_provider.setup database
			users_provider.setup database
			resetDB(done)


	describe 'create', ()->
		it 'should create a new group'
		it 'should add the creator to group members'
		it 'should add the creator to group admins'
