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
				
		describe 'View Mode', ()->
			it 'should have the proper model property', ()->
				view.model.id.should.be.equal '501d3d264eada77e0a000002'
				
			it 'should render the model data', ()->
				$(view.render().el).find('.wikipage-view-body').should.contain 'asdf'
				$(view.render().el).find('.wikipage-title').should.contain 'WikiPage title'

		describe 'Edit Mode', ()->
			it 'should render the model data'
				
				
