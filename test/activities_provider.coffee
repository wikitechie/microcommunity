process.env.NODE_ENV = 'test';

assert = require("assert")
activities_provider = require('./../providers/activities-provider')
wikipages_provider = require('./../providers/wikipages-provider')
database = require('./../providers/db')

db = null

resetDB = (done)->
	db.collection 'activities', (err, docs)->
		docs.remove {}, ()->
			db.collection 'users', (err, docs)->
				docs.remove {}, ()->
					db.collection 'wikipages', (err, docs)->
						docs.remove {}
						done()



describe 'Activities provider', ()->
	before (done)->
		database.connectDB (err, database)->
			db = database
			activities_provider.setup database
			wikipages_provider.setup database
			done(err)
	
	describe 'createActivity', ()->
		before (done)->
			actor =		
				email : "actor@email.com"
				password : "Password"	

			db.collection 'users', (err, users)->
				users.insert actor, (err, actor)->
					attr = 
						title: "Title"
						body: "Body"
						created_at : Date()
				
					wikipages_provider.createWikiPage attr, (err, object)->
						activity = 
							actor : actor._id
							verb  : "some verb"
							object: object._id
							object_type : "WikiPage"
						activities_provider.createActivity activity, (err, activity)->	
							done()					
				
		it 'should create a new activity object', (done)->
			db.collection 'activities', (err, activities)->
				activities.find().count (err, count)->
					assert.equal count, 1
					done()
		
		after (done)->
			resetDB(done)
			
	describe 'fetchActivity', ()->
		it 'should return a correct activity object'
		it 'should return an activity object joined to the right actor'
		it 'should return an activity object joined to the right object'
		it 'should return a correct activity object (passing ObjectID as a string)'		
		it 'should return an activity object joined to the right actor (passing ObjectID as a string)'
		it 'should return an activity object joined to the right object (passing ObjectID as a string)'		
		
	describe 'fetchActivities', ()->
		it 'should return a list of latest 5 activities'
		describe 'pagination', ()->
			it 'should return the from the right point'
			it 'should return the right number of objects'

		
