define [
	'jquery'
	'cs!models/comment'
	'cs!views/comment'	
], ($, Comment, CommentView)->
	describe 'Comment View', ()->	
		comment = null
		commentView = null
		user = 
			_id: "5006de43a836cb97c144ff81"
			email: "email@service.com"	
		
		before ()->
			comment = new Comment
				text: "comment..."
				user: user
				created_at: "Tue Jul 31 2012 07:34:59 GMT+0300 (EEST)"
				
			commentView = new CommentView
				model : comment
				
				
		it 'should have a model property', ()->
			commentView.model.should.be.ok
			
		it 'should have the proper model ', ()->
			commentView.model.get('text').should.be.equal 'comment...'
			
			
		describe 'Rendering', ()->
			it 'should render model data', ()->
				$(commentView.render().el).should.contain 'comment...'
				
			it 'should be a class of \'comment\'', ()->
				$(commentView.render().el).should.have.class 'comment'				
		
