define [
	'cs!models/post'
], (Post)->
	describe 'Post Model', ()->
	
		it 'should have the proper url', ()->
			post = new Post()
			assert.equal post.url(), '/api/posts'
			
		it 'should require a text', ()->
			post = new Post
				user : "123"
			assert.equal post.isValid(), false

		it 'should require a user id', ()->
			post = new Post
				text : "Text"
			assert.equal post.isValid(), false
			
		it 'should be valid given valid attributes', ()->
			post = new Post
				user : "123"
				text : "Text"
			assert.equal post.isValid(), true		
			
