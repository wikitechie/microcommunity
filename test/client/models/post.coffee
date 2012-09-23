define [
	'cs!models/post'	
], (Post)->
	describe 'Post Model', ()->	
		describe 'Validation', ()->	
			
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
				user = 
					_id: "5006de43a836cb97c144ff81"
					email: "email@service.com"				
				post = new Post 
					_id : "5016b37f1c97f88c0f00002f"
					text: "Text"
					created_at :"2012-07-30T16:17:03.000Z"
					user : user
					comments : [
						{text : "this is a comment",	user : user }
						{text : "this is a comment",	user : user }						
						{text : "this is a comment",	user : user }						
					]
					
					
			it 'should have a comments association', ()->					
				assert.ok post.get('comments')
				post.get('comments').each (comment)->
					assert.equal comment.constructor.name, "Comment"
					
			it 'should initialize each comment with the right url', ()->	
				assert.ok post.get('comments')
				post.get('comments').each (comment)->
					assert.equal comment.url(), "/api/posts/5016b37f1c97f88c0f00002f/comments"
					
		describe 'Post-Parent association', ()->
		
			describe 'User as a parent case', ()->		
				post = null			
				before ()->
					user = 
						_id: "5006de43a836cb97c144ff81"
						email: "email@service.com"				
					post = new Post 
						_id : "5016b37f1c97f88c0f00002f"
						text: "Text"
						created_at :"2012-07-30T16:17:03.000Z"
						user : user
						parent : user
						parent_type : 'users'
						comments : [
							{text : "this is a comment",	user : user }
							{text : "this is a comment",	user : user }						
							{text : "this is a comment",	user : user }						
						]				
					
				it 'should have a parent association with a user model', ()->					
					assert.ok post.get('parent')
					assert.equal post.get('parent').constructor.name, "User"					
					assert.equal post.get('parent').id, "5006de43a836cb97c144ff81"
					
			describe 'Group as a parent case', ()->		
				post = null			
				before ()->
					user = 
						_id: "5006de43a836cb97c144ff81"
						email: "email@service.com"				
					post = new Post 
						_id : "5016b37f1c97f88c0f00002f"
						text: "Text"
						created_at :"2012-07-30T16:17:03.000Z"
						user : user
						parent : 
							_id : "5006dedfa836cb97c144ff81"
							name : "A trivial group"
						parent_type : 'groups'
						comments : [
							{text : "this is a comment",	user : user }
							{text : "this is a comment",	user : user }						
							{text : "this is a comment",	user : user }						
						]				
					
				it 'should have a parent association with a group model', ()->					
					assert.ok post.get('parent')
					assert.equal post.get('parent').constructor.name, "Group"					
					assert.equal post.get('parent').id, "5006dedfa836cb97c144ff81"					
	
												
															
			
