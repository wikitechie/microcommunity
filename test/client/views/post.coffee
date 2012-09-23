define [
	'jquery'
	'cs!models/post'
	'cs!views/post'	
], ($, Post, PostView)->
	describe 'Post View', ()->	
		post = null
		postView = null
		el = null
		before ()->
		
			user = 
				_id: "5006de43a836cb97c144ff81"
				email: "email@service.com"
				profile:
					displayName : "User name"		
			post = new Post 
				_id : "5016b37f1c97f88c0f00002f"
				text: "Text"
				created_at :"2012-07-30T16:17:03.000Z"
				user : user
				comments : [
					{"text":"Comment 1", user:user,"created_at":"Tue Jul 31 2012 07:34:59 GMT+0300 (EEST)"}
					{"text":"Comment 2", user:user,"created_at":"Tue Jul 31 2012 07:35:00 GMT+0300 (EEST)"}
				]
				parent : user
				parent_type : "users"
					
			postView = new PostView
				model : post	
				
			el = $(postView.render().el)				

				
		it 'should have a model attribute', ()->
			assert.ok postView.model
		
		it 'should have a comments thread attribute', ()->
			assert.ok postView.commentsThread		
		
		describe 'Rendering', ()->
			
			it 'should return the view object', ()->
				assert.equal postView.render(), postView
				
			it 'should contain the model data', ()->
				el.should.contain 'Text'
				el.should.contain 'email@service.com'
				
			it 'should render the comments thread', ()->
				el.should.have('.comments-thread')
				

				
					
