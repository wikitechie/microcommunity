define [
	'cs!models/activity'
	'cs!models/post'	
], (Activity, Post)->
	describe 'Activity Model', ()->	
	
		describe 'Validation', ()->
		
		describe 'Associations', ()->
		
			describe 'Activity-Actor association', ()->		
				activity = null
				before ()->
					activity = new Activity
						_id:"501a0fb4e7d126a70c000002",
						actor:
							_id:"5006de43a836cb97c144ff81"
							email:"user@gmail.com"					
						verb:"create"
						created_at:"2012-08-02T05:27:16.831Z"		
						
				it 'should have an actor association', ()->
					assert.ok activity.get 'actor'
					assert.equal activity.get('actor').constructor.name, "User"
					
				it 'should be associated to the right actor', ()->
					assert.equal activity.get('actor').id, "5006de43a836cb97c144ff81"

		
			describe 'Activity-Object association: Post case', ()->	
			
				activity = null
				object = null				
				
				before ()->
					activity = new Activity
						_id:"501a0fb4e7d126a70c000002",
						actor:
							_id:"5006de43a836cb97c144ff81"
							email:"actor@email.com"
						object:
							_id : "5016b37f1c97f88c0f00002f"
							text: "Text"
							created_at :"2012-07-30T16:17:03.000Z"
							user : 
								_id: "5006de43a836cb97c144ff81"
								email: "email@service.com"
						object_type : "Post"											
						verb:"create"
						created_at:"2012-08-02T05:27:16.831Z"		
				
				it 'should have an object association to a Post model', ()->
					assert.ok activity.get 'object'
					assert.equal activity.get('object').constructor.name, 'Post'

			describe 'Activity-Object association: Revision case', ()->	
			
				activity = null
				object = null				
				
				before ()->
					activity = new Activity
						_id:"501a0fb4e7d126a70c000002",
						actor:
							_id:"5006de43a836cb97c144ff81"
							email:"actor@email.com"
						object:
							page:
								title: "asdf"
								body:"asdf"
								summary:null
								created_at:"2012-08-02T06:03:00.566Z"
								_id:"501a18146affaaa50e000002"																								
						object_type : "Revision"											
						verb:"create"
						created_at:"2012-08-02T05:27:16.831Z"		
				
				it 'should have an object association to a Revision model', ()->
					assert.ok activity.get 'object'
					assert.equal activity.get('object').constructor.name, 'Revision'
						
											
		
