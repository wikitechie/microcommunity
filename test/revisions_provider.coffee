process.env.NODE_ENV = 'test';

assert = require("assert")
database = require('./../providers/db')
wikipages_provider = require('./../providers/wikipages-provider')
revisions_provider = require('./../providers/revisions-provider')

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
									db.close()
									done()


describe 'Revisions Provider', ()->

	revision = null
	wikipage = null
	before (done)->
		database.connectDB (err, database)->
			db = database
			wikipages_provider.setup database
			revisions_provider.setup database
			attr =
  			title : "Title"
  			body  : "Body"
  			created_at : new Date()  		
				
			wikipages_provider.createWikiPage attr, (err, new_wikipage)->
				revision = new_wikipage.current_revision
				wikipage = new_wikipage
				done()

	describe 'fetch', ()->
		it 'should return the right revision', (done)->
			revisions_provider.fetch revision._id, (err, right_revision)->
				assert.equal right_revision._id.toString(), revision._id.toString()
				done()
			
		it 'should return the revision joined to the right wikipage', (done)->
			revisions_provider.fetch revision._id, (err, joined_revision)->
				assert.equal joined_revision.page._id.toString(), wikipage._id.toString()
				done()
		

