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
					name: "Amjad"
					text: "asdf"
					created_at :"2012-07-30T16:17:03.000Z"
					user : 
						_id: "5006de43a836cb97c144ff81"
						email: "isstaif@gmail.com"
											
			it 'should be valid given valid attributes', ()->
				console.debug post.relations
				assert.equal post.isValid(), true

			it 'should have a user association', ()->
				assert.ok post.get('user')
				assert.equal post.get('user').constructor.name, "User"
				
				
			
