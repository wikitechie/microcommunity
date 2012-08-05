define [
	'jquery'
	'cs!models/revision'
	'cs!views/wikipage'	
], ($, Revision, WikiPageView)->

	describe 'WikiPage View', ()->
		revision = null
		view = null
		before ()->
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
					"title":"WikiPage title"
				"body":"asdf"
				"summary": "Summary of change"
				"created_at":"2012-08-04T15:17:58.112Z"
				"_id":"501d3d264eada77e0a000002"
			view = new WikiPageView
				model : revision
				
			$("#playarea").append view.render().el								
				
		describe 'View Mode', ()->
			it 'should have the proper model property', ()->
				view.model.id.should.be.equal '501d3d264eada77e0a000002'
				
			it 'should render the model data', ()->
				$(view.el).find('.wikipage-view-body').should.contain 'asdf'
				$(view.el).find('.wikipage-title').should.contain 'WikiPage title'
			
			it 'should not render edit buttons for visitors', ()->
				$(view.el).find('.buttons').should.not.have('.edit-button')		
			
			it 'should render edit buttons for logged in users',()->
				window.current_user = 
					email : "email@service.com"
				$(view.render().el).find('.buttons').should.have('.edit-button')	
				window.current_user = null							

		describe 'Edit Mode', ()->
			before ()->
				view.editButton()
								
			it 'should render the model data', ()->
				$(view.el).find('textarea').should.have.text 'asdf'
				
			it 'should render the cancel and edit buttons', ()->
				$(view.el).find('.buttons').should.have '.save-button'
				$(view.el).find('.buttons').should.have '.cancel-button'			
				
		after ()->
			$("#playarea").html ""

				
				
