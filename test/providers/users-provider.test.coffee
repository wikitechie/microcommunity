process.env.NODE_ENV = 'test';

assert = require "assert"
database = require('./../../providers/db')
users_provider = require('./../../providers/users-provider')

db = null

resetDB = (done)->
	db.collection 'users', (err, docs)->
		docs.remove {}, ()->	
			done()		


describe 'Users Provider', ()->
	user = null
	attr =
		email : "isstaif@gmail.com"
		
	before (done)->
		database.connectDB (err, database)->
			db = database
			users_provider.setup database
			done()
			
	describe 'create', ()->
		created = null
	
		it 'should create a new user object',(done)->	
			users_provider.create attr, (err, user)->
				created = user
				db.collection 'users', (err, users)->
					users.find().count (err, count)->
						assert.equal count , 1
						done()
						
		it 'should return the user created',(	)->	
			assert.ok created._id
			assert.equal created.email, attr.email
								
		after (done)->		
			resetDB(done)		

									
	describe 'fetch', ()->		
		before (done)->
			db.collection 'users', (err, users)->
				users.insert attr, (err, inserted)->
					user = inserted[0]
					done()		
			
		it 'should return a user object', (done)->
			users_provider.fetch user._id, (err, fetched) ->
				assert.equal fetched._id.toString(), user._id.toString()
				done()
				
		after (done)->
			resetDB(done)
			
	describe 'fetchByEmail', ()->	
		
		before (done)->
			db.collection 'users', (err, users)->
				users.insert attr, (err, inserted)->
					done()		
			
		it 'should return the user object with the passed email', (done)->
			users_provider.fetchByEmail attr.email, (err, fetched) ->
				assert.equal fetched.email, attr.email
				done()
				
		after (done)->
			resetDB(done)
			
			
	
		
