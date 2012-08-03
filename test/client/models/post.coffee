define [
	'cs!models/post'	
], (Post)->
	describe 'Post Model', ()->	
		describe 'Validation', ()->	
			it 'should have the proper url', ()->
				post = new Post()
				assert.equal post.url(), '/api/posts'
			
			it 'should require a text', ()->
				post = new Post
					user : "123"
				assert.equal post.isValid(), false

			it 'should require a user', ()->
				post = new Post
					text : "Text"
				assert.equal post.isValid(), false
			
		describe 'Post-User association', ()->		
			post = null
			
			before ()->
				post = new Post 
					_id : "5016b37f1c97f88c0f00002f"
					text: "Text"
					created_at :"2012-07-30T16:17:03.000Z"
					user : 
						_id: "5006de43a836cb97c144ff81"
						email: "email@service.com"

			it 'should have a user association', ()->
				assert.ok post.get('user')
				assert.equal post.get('user').constructor.name, "User"
				
			it 'should be associated to the right user', ()->
				assert.equal post.get('user').get('email'), "email@service.com"
				assert.equal post.get('user').id, "5006de43a836cb97c144ff81"												
				
		describe 'Post-Comments association', ()->		
			post = null
			
			before ()->
				post = new Post 
					_id : "5016b37f1c97f88c0f00002f"
					text: "Text"
					created_at :"2012-07-30T16:17:03.000Z"
					user : 
						_id: "5006de43a836cb97c144ff81"
						email: "email@service.com"
					comments : []
					
			it 'should have a comments association', ()->					
				assert.ok post.get('comments')
				post.get('comments').each (comment)->
					assert.equal comment.constructor.name, "Comment"
					
			it 'should initialize each comment with the right url', ()->	
				assert.ok post.get('comments')
				post.get('comments').each (comment)->
					assert.equal comment.url(), "/api/posts/5016b37f1c97f88c0f00002f/comments"
												
															
			
