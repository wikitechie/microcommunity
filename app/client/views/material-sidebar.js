define([
	'bb',
	'views/sidebars/basic',
	'models/material'
], function(Backbone, BasicSidebar, Material){

	return function(materialJSON){
		var material = Material.findOrCreate(materialJSON)
		return new BasicSidebar({
			header : material.get('name'),
			links : [ 
				{ label : '<i class="icon-home"></i> Home', url : material.link() },
				{ label : '<i class="icon-user"></i> Members', url : material.link() + '/members' },				
				{ label : '<i class="icon-comment"></i> Wall', url : material.link() + '/wall' },
				{ label : '<i class="icon-list-alt"></i> Stream', url : material.link() + '/stream' },
				{ label : '<i class="icon-pencil"></i> New Wikipage', url : material.link() + '/wikipages/new'},
				{ label : '<i class="icon-question-sign"></i> Ask a Question', url : material.link() + '/#'},
				{ label : '<i class="icon-upload"></i> Upload a File', url : material.link() + '/files/new'}
																			
			]
		})	
	}
})
