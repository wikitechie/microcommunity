process.env.NODE_ENV = 'test';

assert = require("assert")
database = require('./../../providers/db')
posts_provider = require('./../../providers/posts-provider')
wikipages_provider = require('./../../providers/wikipages-provider')
revisions_provider = require('./../../providers/revisions-provider')
users_provider = require('./../../providers/users-provider')
comments_provider = require('./../../providers/comments-provider')

db = null

resetDB = (callback)->
	db.collection 'posts', (err, docs)->
		docs.remove {}, ()->
			db.collection 'users', (err, docs)->
				docs.remove {}, ()->
					callback()

describe 'Comments Provider', ()->

	post = null
	user = null
	comment = null
	wikipage = null	
	new_comment = null
	returned_comment = null


	before (done)->
		database.connectDB (err, database)->
			db = database
			
			users_provider.setup database
			posts_provider.setup database
			comments_provider.setup database			
			wikipages_provider.setup database	
			revisions_provider.setup database				
			
			resetDB ()->
				user_attr = 
					email : "email@service.com"
					password : "Password"

				users_provider.create user_attr, (err, created_user)->
					user = created_user
					post_attr = 
						text: "A Post"
						user: created_user._id
						created_at : Date()	
				
					posts_provider.createPost post_attr, (err, p)->
						post = p
						
						wikipage_attr = 
							title : "Title"
							body  : "Body"
							user: created_user._id
							created_at : new Date()  		
						
				
						wikipages_provider.createWikiPage wikipage_attr, (err, new_wikipage)->	
							wikipage = new_wikipage		
							comment = 
								text : "Hehe!"
								user : user._id
								created_at : new Date()							
			
							done()		
			
	describe 'Posts Comments', ()->	
		describe 'creating a new comment', ()->						
			it 'should add the comment to the post object', (done)->								
				comments_provider.addComment comment, 'posts', post._id, (err, c)->
					returned_comment = c
					db.collection 'posts', (err, collection)->
						collection.findOne { _id : database.normalizeID(post._id)}, (err, new_post)->
							assert.equal new_post.comments.length, 1
							new_comment = new_post.comments[0]
							done()
							
			it 'should return the comment object', ()->
				assert.ok returned_comment
				assert.equal returned_comment.text, comment.text
				
			it 'should return the comment object joined to the right user', ()->
				assert.ok returned_comment.user
				assert.equal returned_comment.user._id.toString(), user._id.toString()
							
							
		describe 'fetchJoinedComment', ()->
			it 'should fetch a comment joined to the right user', (done)->
				comments_provider.fetchJoinedComment new_comment, (err, joined)->
					assert.ok joined.user._id
					assert.equal joined.user._id.toString(), user._id.toString()
					done()
					
					
	describe 'Revisions Comments', ()->
		describe 'creating a new comment', ()->						
			it 'should add the comment to the revision object', (done)->	
				comment = 
					text : "Hehe!"
					user : user._id
					created_at : new Date()					
				comments_provider.addComment comment, 'revisions', wikipage.current_revision._id, (err, c)->
					db.collection 'revisions', (err, collection)->
						collection.findOne { _id : database.normalizeID(wikipage.current_revision._id)}, (err, new_revision)->
							assert.ok new_revision.comments
							assert.equal new_revision.comments.length, 1
							done()											
						

