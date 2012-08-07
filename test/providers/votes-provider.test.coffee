process.env.NODE_ENV = 'test';

assert = require "assert"
database = require('./../../providers/db')
votes_provider = require('./../../providers/votes-provider')
wikipages_provider = require('./../../providers/wikipages-provider')
revisions_provider = require('./../../providers/revisions-provider')
users_provider = require('./../../providers/users-provider')

db = null

resetDB = (done)->
	db.collection 'activities', (err, docs)->
		docs.remove {}, ()->
			db.collection 'users', (err, docs)->
				docs.remove {}, ()->
					db.collection 'wikipages', (err, docs)->
						docs.remove {}, ()->
							db.collection 'revisions', (err, docs)->
								docs.remove {}, ()->
									done()
									
describe 'Votes Provider', ()->

	revision = null
	wikipage = null
	user = null
	
	before (done)->
		database.connectDB (err, database)->
			db = database
			wikipages_provider.setup database
			revisions_provider.setup database
			users_provider.setup database
			votes_provider.setup database		
			
			resetDB ()->	
			
				user_attr =
					email : "isstaif@gmail.com"		
					
				users_provider.create user_attr, (err, created)->
					user = created 	
				
					attr =
						title : "Title"
						body  : "Body"
						user : user._id
						created_at : new Date()  				
				
					wikipages_provider.createWikiPage attr, (err, new_wikipage)->
						revision = new_wikipage.current_revision
						wikipage = new_wikipage
						done()


	describe 'Up voting', ()->
		it 'should up vote it, if the user votes for the first time', (done)->
			votes_provider.up_vote user._id, revision._id, 'revisions', (votes_err)->
				db.collection 'revisions', (err, revisions)->
					revisions.findOne { _id : revision._id }, (err, new_revision)->
						assert.ok new_revision.up_votes
						assert.equal new_revision.up_votes.length, 1
						assert.equal new_revision.up_votes[0].user.toString(), user._id.toString()
						done()
						
		it 'should not vote it, if the user has voted before', (done)->
			votes_provider.up_vote user._id, revision._id, 'revisions', (votes_err)->
				db.collection 'revisions', (err, revisions)->
					revisions.findOne { _id : revision._id }, (err, new_revision)->
						assert.ok new_revision.up_votes
						assert.equal new_revision.up_votes.length, 1
						assert.equal new_revision.up_votes[0].user.toString(), user._id.toString()
						assert.ok votes_err		
						done()
						
	describe 'Down voting', ()->
		it 'should vote it down, if the user votes for the first time', (done)->
			votes_provider.down_vote user._id, revision._id, 'revisions', (votes_err)->
				db.collection 'revisions', (err, revisions)->
					revisions.findOne { _id : revision._id }, (err, new_revision)->
						assert.ok new_revision.down_votes
						assert.equal new_revision.down_votes.length, 1
						assert.equal new_revision.down_votes[0].user.toString(), user._id.toString()
						done()
						
		it 'should not vote it, if the user has voted before', (done)->
			votes_provider.down_vote user._id, revision._id, 'revisions', (votes_err)->
				db.collection 'revisions', (err, revisions)->
					revisions.findOne { _id : revision._id }, (err, new_revision)->
						assert.ok new_revision.down_votes
						assert.equal new_revision.down_votes.length, 1
						assert.equal new_revision.down_votes[0].user.toString(), user._id.toString()
						assert.ok votes_err						
						done()		
						
	describe 'fetch up votes', ()->
	
		before ()->
		it 'should fetch an array of up votes', (done)->
			votes_provider.fetch_up_votes revision._id, 'revisions', (err, up_votes)->		
				assert.ok up_votes
				assert.ok up_votes.length
				assert.equal up_votes.length, 1 
				done()
		
	describe 'fetch down votes', ()->
		it 'should fetch an array of down votes', (done)->
			votes_provider.fetch_down_votes revision._id, 'revisions', (err, down_votes)->		
				assert.ok down_votes
				assert.ok down_votes.length
				assert.equal down_votes.length, 1 
				done()
				
