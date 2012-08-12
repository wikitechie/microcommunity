process.env.NODE_ENV = 'test';

assert = require "assert"
database = require('./../../providers/db')
users_provider = require('./../../providers/users-provider')
follows_provider = require('./../../providers/follows-provider')

db = null

resetDB = (done)->
	db.collection 'activities', (err, docs)->
		docs.remove {}, ()->
			db.collection 'users', (err, docs)->
				docs.remove {}, ()->
					done()
									
describe 'Follows Provider', ()->

	follower = null
	followed = null
	
	before (done)->
		database.connectDB (err, database)->
			db = database
			users_provider.setup database
			follows_provider.setup database		
			
			resetDB ()->					
				users_provider.create { email: "follower@email.com" }, (err, created_follower)->
					users_provider.create { email: "followed@email.com" }, (err, created_followed)->
						follower = created_follower
						followed = created_followed
						done()
				
	describe 'follow', ()->
		it 'should mark the target user as followed', (done)->
			follows_provider.follow follower._id, followed._id, (err)->
				db.collection 'users', (err, users)->
					users.findOne { _id : follower._id }, (err, updated)->
						assert.ok updated.follows.length
						assert.equal updated.follows.length, 1
						assert.equal updated.follows[0].toString(), followed._id.toString()
						done()
						
		it 'should not follow many times', (done)->
			follows_provider.follow follower._id, followed._id, (err)->
				db.collection 'users', (err, users)->
					users.findOne { _id : follower._id }, (err, updated)->
						assert.ok updated.follows.length
						assert.equal updated.follows.length, 1
						assert.equal updated.follows[0].toString(), followed._id.toString()
						done()						
	
	describe 'fetch follows', ()->
	
		it 'should return an array of followed users', (done)->
			follows_provider.fetch follower._id, (err, results)->
				assert.ok results.length
				assert.ok results[0], followed._id
				done()
		
	
	describe 'unfollow', ()->
		it 'should remove the target user from the followed list', (done)->	
			follows_provider.unfollow follower._id, followed._id, (err)->
				db.collection 'users', (err, users)->
					users.findOne { _id : follower._id }, (err, updated)->
						assert.equal updated.follows.length, 0
						done()
								
				
