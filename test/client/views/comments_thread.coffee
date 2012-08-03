define [
	'jquery'
	'underscore'
	'cs!models/comment'
	'cs!collections/comments'
	'cs!views/comments_thread'	
], ($, _, Comment, Comments, CommentsThread)->
	describe 'Comments Thread View', ()->	
	
		user = null
		comments = null
		thread = null
		mappedComments = null
	
		before ()->
			user = 
				_id: "5006de43a836cb97c144ff81"
				email: "email@service.com"			
			comments = new Comments [
				{"text":"Comment 1", user:user, "created_at":"Tue Jul 31 2012 07:34:59 GMT+0300 (EEST)"}
				{"text":"Comment 2", user:user, "created_at":"Tue Jul 31 2012 07:35:00 GMT+0300 (EEST)"}
			]
			thread = new CommentsThread
				collection : comments
				
			$("#playarea").append thread.render().el				
			j = -1
			mappedComments = thread.collection.map (item)->
				j = j + 1
				{ model: item, index: j}		
							
	
		it 'should have a collection', ()->
			thread.collection.should.be.ok
			
		it 'should have the right collection', ()->
			_.each mappedComments, (comment)->
				comment.model.get('text').should.be.equal comments.at(comment.index).get('text')
				
				
		describe 'creating a new comment', ()->
			new_comment = null
			
			before ()->
				new_comment = new Comment
					text : "New comment"
					user : user					
					"created_at":"Tue Jul 31 2012 07:35:00 GMT+0300 (EEST)"
				thread.injectComment new_comment						
			
			it '@injectComment should inject the comment view into the thread', ()->
				$(thread.el).find('.comments-list').find('.comment').last().should.contain new_comment.get('text')
		
		describe 'Rendering', ()->
			it "should be a class of 'comments-thread'", ()->
				$(thread.el).should.have.class 'comments-thread'
				
			it 'should render all initial passed comments', ()->
				_.each comments, (comment)->
					$(thread.el).should.have comment.get 'text'
			
			it 'should not render the textarea for visitors', ()->
				$(thread.el).find('.comments-text').should.be.hidden
				
			it 'should render the textarea for logged in users', ()->
				window.current_user = user
				$(thread.render().el).find('.comments-text').should.be.not.hidden
					
				
