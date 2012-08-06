define [
	'cs!models/wikipage'
], (Revision)->

	describe 'WikiPage Model', ()->
		wikipage = null
		before ()->
			wikipage = new WikiPage
				"_id":"501d3d264eada77e0a000001"
				"created_at":"2012-08-04T15:17:58.111Z"
				"current_revision":
					"page":"501d3d264eada77e0a000001"
					"body":"asdf",
					"summary":null,
					"created_at":"2012-08-04T15:17:58.112Z"
					"_id":"501d3d264eada77e0a000002"
				"title":"asdf"
