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
	user = null
	group = null
	created_group = null

	before (done)->
		database.connectDB (err, database)->
			db = database
			groups_provider.setup database
			users_provider.setup database
			resetDB(done)

	describe 'create', ()->	
		
		before (done)->		
			user_attr = 
				email : "email@service.com"
				password : "Password"
				
			group_attr =
				name : "Group name"
				created_at : new Date()
	
			users_provider.create user_attr, (err, created_user)->
				user = created_user	
			
			groups_provider.create group_attr, user._id, (err, new_group)->
				group = new_group
				db.collection 'groups', (err, groups)->
					groups.findOne {}, (err, new_group)->
						created_group = new_group
						done()

		it 'should create a new group', ()->
			assert.ok created_group
			assert.equal created_group.name , group.name
					
		it 'should add the creator to group members', ()->
			assert.ok created_group.members
			assert.equal created_group.members.length, 1
			assert.equal created_group.members[0].toString(), user._id.toString()
			
			
		it 'should add the creator to group admins', ()->
			assert.ok created_group.admins
			assert.equal created_group.admins.length, 1
			assert.equal created_group.admins[0].toString(), user._id.toString()
			
	describe 'fetch', ()->
		fetched_group = null
		before (done)->
			groups_provider.fetch created_group._id, (err, fetched)->
				fetched_group = fetched
				done()
							
		it 'should fetch the right group', ()->
			assert.ok fetched_group
			assert.equal created_group._id.toString(), fetched_group._id.toString()
			
		it 'should fetch the group with joined members'
		it 'should fetch the group with joined admins'

				
		
		
