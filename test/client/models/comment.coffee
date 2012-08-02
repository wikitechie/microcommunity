define [
	'cs!models/comment'
], (Comment)->
	describe 'Comment Model', ()->
	
		describe 'Validation', ()->
			it 'should require a text'
			it 'should require a user'
			
		describe 'Comment-User association', ()->
			comment = null
			before ()->
				comment = new Comment
					text : "this is a comment"
					user : 
						email : "name@email.com"
			
			it 'should have a user association', ()->
				assert.ok comment.get 'user'
				assert.equal comment.get('user').constructor.name, 'User'

