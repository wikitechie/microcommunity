define [
	'cs!models/wikipage'
], (WikiPage)->

	describe 'WikiPage Model', ()->

				
		describe 'Post-Parent association', ()->
		
			describe 'User as a parent case', ()->		
				wikipage = null			
				before ()->
					user = 
						_id: "5006de43a836cb97c144ff81"
						email: "email@service.com"				
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
						parent : user
						parent_type : "users"
					
				it 'should have a parent association with a user model', ()->					
					assert.ok wikipage.get('parent')
					assert.equal wikipage.get('parent').constructor.name, "User"					
					assert.equal wikipage.get('parent').id, "5006de43a836cb97c144ff81"
					
			describe 'Group as a parent case', ()->		
				wikipage = null			
				before ()->
					group = 
						_id: "5006de43a836cb97c144ff81"
						name: "some group name"				
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
						parent : group							
						parent_type : "groups"
					
				it 'should have a parent association with a user model', ()->					
					assert.ok wikipage.get('parent')
					assert.equal wikipage.get('parent').constructor.name, "Group"					
					assert.equal wikipage.get('parent').id, "5006de43a836cb97c144ff81"					
					

			
