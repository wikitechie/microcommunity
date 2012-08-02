define [
	'cs!models/user'
], (User)->
	describe 'User Model', ()->
	
		it 'should have the proper url', ()->
			user = new User()
			assert.equal user.url(), '/api/users'
