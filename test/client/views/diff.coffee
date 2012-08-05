define [
	'jquery'
	'cs!models/revision'
	'cs!views/diff'
], ($, Revision, DiffView)->

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
			view = new DiffView
				model : revision
				
			$("#playarea").append view.render().el		
