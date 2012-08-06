process.env.NODE_ENV = 'test';

assert = require("assert")
database = require('./../../providers/db')
posts_provider = require('./../../providers/posts-provider')
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

	before (done)->
		database.connectDB (err, database)->
			db = database
			users_provider.setup database
			posts_provider.setup database
			comments_provider.setup database			
			resetDB(done)
			
			
	describe 'Posts Comments', ()->

		post = null
		user = null
		comment = null
		new_comment = null
		returned_comment = null
		
		before (done)->
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
					
					comment = 
						text : "Hehe!"
						user : user._id
						created_at : new Date()							
					
					done()		
	
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
				
						
						

