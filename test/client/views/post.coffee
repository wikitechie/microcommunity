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
			post = new Post 
				_id : "5016b37f1c97f88c0f00002f"
				text: "Text"
				created_at :"2012-07-30T16:17:03.000Z"
				user : 
					_id: "5006de43a836cb97c144ff81"
					email: "email@service.com"
					
			postView = new PostView
				model : post	
				
			el = $(postView.render().el)
				

				
		it 'should have a model attribute', ()->
			assert.ok postView.model
		
		describe 'Rendering', ()->
			
			it 'should return the view object', ()->
				assert.equal postView.render(), postView
				
			it 'should contain the model data', ()->
				#body
				assert.equal el.find('.text').html(), 'Text'
				#user email				
				assert.equal el.find('.email').html(), 'email@service.com'
					
