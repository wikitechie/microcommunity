define [
	'cs!models/revision'
], (Revision)->

	describe 'Revision Model', ()->
		revision = null
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
						"title":"asdf"
				"body":"asdf"
				"summary": "Summary of change"
				"created_at":"2012-08-04T15:17:58.112Z"
				"_id":"501d3d264eada77e0a000002"
				
				
		describe 'Revision-Page association', ()->
		
			it 'should be associated to a page', ()->
				revision.get('page').constructor.name.should.be.equal 'WikiPage'
				
			it 'should be associated to the right page', ()->
				revision.get('page').id.should.be.equal "501d3d264eada77e0a000001"
