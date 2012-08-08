define [
	'cs!models/vote'	
], (Vote)->
	describe 'Vote Model', ()->	
	
		describe 'Vote-User association', ()->
			vote = null
			before ()->
				vote = new Vote 
					_id : "5016b37f1c97f88c0f00002f"
					created_at :"2012-07-30T16:17:03.000Z"
					user : 
						_id: "5006de43a836cb97c144ff81"
						email: "email@service.com"
		
			it 'should have a user association', ()->
				assert.ok vote.get('user')
				assert.equal vote.get('user').constructor.name, "User"
				
			it 'should be associated to the right user', ()->
				assert.equal vote.get('user').get('email'), "email@service.com"
				assert.equal vote.get('user').id, "5006de43a836cb97c144ff81"				
