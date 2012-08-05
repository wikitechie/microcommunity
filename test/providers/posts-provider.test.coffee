process.env.NODE_ENV = 'test';

assert = require("assert")
posts_provider = require('./../../providers/posts-provider')
database = require('./../../providers/db')
users_provider = require('./../../providers/users-provider')

db = null

resetDB = (callback)->
	db.collection 'posts', (err, docs)->
		docs.remove {}, ()->
			db.collection 'users', (err, docs)->
				docs.remove {}, ()->
					callback()

describe 'Posts Provider', ()->

	before (done)->
		database.connectDB (err, database)->
			db = database
			users_provider.setup database
			posts_provider.setup database
			resetDB(done)

	
	describe 'create', ()->	
		returned_post = null
		before (done)->
		
			user_attr = 
				email : "email@service.com"
				password : "Password"
	
			users_provider.create user_attr, (err, created_user)->
				post_attr = 
					text: "A Post"
					user: created_user._id
					created_at : Date()	
							
				posts_provider.createPost post_attr, (err, post)->
					returned_post = post
					done()					
					
		it 'should create a new post object', (done)->
			db.collection 'posts', (err, posts)->
				posts.find().count (err, count)->
					assert.equal count, 1
					done()
			
		it 'should return the correct post object', (done)->
			db.collection 'posts', (err, posts)->	
				posts.findOne {}, (err, original)->
					assert.equal returned_post._id.toString(), original._id.toString()
					done()
		
		it 'should return a post object joined to the correct user', (done)->
			assert.ok returned_post.user._id		
			db.collection 'posts', (err, posts)->	
				posts.findOne {}, (err, original)->
					assert.equal returned_post.user._id.toString(), original.user.toString()
					done()		

	
	
	describe 'fetch', ()->
		created_post = null
		created_user = null
		before (done)->
			resetDB ()->		
				user_attr = 
					email : "email@service.com"
					password : "Password"
	
				users_provider.create user_attr, (err, user)->
					created_user = user
					post_attr = 
						text: "A Post"
						user: created_user._id
						created_at : Date()	
							
					posts_provider.createPost post_attr, (err, post)->
						created_post = post
						done()								
			
		it 'should return the right post', (done)->
			posts_provider.fetch created_post._id, (err, post)->
				assert.equal created_post._id.toString(), post._id.toString()
				done()
			
		it 'should return a post joined the correct user', (done)->
			posts_provider.fetch created_post._id, (err, post)->
				assert.ok post.user._id
				assert.equal post.user._id.toString(), created_user._id.toString()
				done()

	

