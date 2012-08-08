define [
	'cs!models/revision'
], (Revision)->

	describe 'Revision Model', ()->
		revision = null
		before ()->		
			user = 
				_id: "5006de43a836cb97c144ff81"
				email: "email@service.com"				
			another_user = 
				_id: "5006de43a836cb97cd44df81"
				email: "anotheremail@service.com"
				
			revision = new Revision
				"page":
					"_id":"501d3d264eada77e0a000001"
					"created_at":"2012-08-04T15:17:58.111Z"
					"current_revision":
						"page":"501d3d264eada77e0a000001"
						"body":"asdf",
						"summary":null,
						"created_at":"2012-08-04T15:17:58.112Z"
						"_id":"501d3d264eada77e0a000002"
						"title":"asdf"
				"body":"asdf"
				"summary": "Summary of change"
				"created_at":"2012-08-04T15:17:58.112Z"
				"_id":"501d3d264eada77e0a000002"
				user : user
				comments : [
					{text : "this is a comment",	user : user }
					{text : "this is a comment",	user : user }						
					{text : "this is a comment",	user : user }						
				]
				up_votes : [
					{ created_at : new Date(),	user : user }
				]
				down_votes : [
					{ created_at : new Date(),	user : another_user }
				]				
						

		describe 'Revision-Page association', ()->		
			it 'should be associated to a page', ()->
				revision.get('page').constructor.name.should.be.equal 'WikiPage'
				
			it 'should be associated to the right page', ()->
				revision.get('page').id.should.be.equal "501d3d264eada77e0a000001"
				
		describe 'Revision-Comments association', ()->							
			it 'should have a comments association', ()->					
				assert.ok revision.get('comments')
				revision.get('comments').each (comment)->
					assert.equal comment.constructor.name, "Comment"
					
			it 'should initialize each comment with the right url', ()->	
				assert.ok revision.get('comments')
				revision.get('comments').each (comment)->
					assert.equal comment.url(), "/api/revisions/501d3d264eada77e0a000002/comments"
					
		describe 'Revision-User association', ()->			
			it 'should have a user association', ()->
				assert.ok revision.get('user')
				assert.equal revision.get('user').constructor.name, "User"
				
			it 'should be associated to the right user', ()->
				assert.equal revision.get('user').get('email'), "email@service.com"
				assert.equal revision.get('user').id, "5006de43a836cb97c144ff81"		
				
		describe 'Revision - Up-votes association', ()->
			it 'should have a votes-up association', ()->
				assert.ok revision.get('up_votes')
				revision.get('up_votes').each (vote)->
					assert.equal vote.constructor.name, "Vote"			
					
			it 'all up-votes should be related back to the revision', ()->
				revision.get('up_votes').each (vote)->
					assert.ok vote.get('voted_object')				
					assert.equal vote.get('voted_object').constructor.name, "Revision"
					assert.equal vote.get('voted_object').id, "501d3d264eada77e0a000002"											
										
			it 'should initialize each comment with the right url', ()->	
				revision.get('up_votes').each (vote)->
					assert.equal vote.url(), "/api/revisions/501d3d264eada77e0a000002/votes"					
			
		describe 'Revision - Down-votes association', ()->		
			it 'should have a down-votes association', ()->
				assert.ok revision.get('down_votes')
				revision.get('down_votes').each (vote)->
					assert.equal vote.constructor.name, "Vote"		
			it 'all down-votes should be related back to the revision', ()->
				revision.get('down_votes').each (vote)->
					assert.ok vote.get('voted_object')				
					assert.equal vote.get('voted_object').constructor.name, "Revision"
					assert.equal vote.get('voted_object').id, "501d3d264eada77e0a000002"								
			
