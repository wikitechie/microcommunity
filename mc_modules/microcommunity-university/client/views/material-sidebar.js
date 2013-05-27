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
				{label : 'Home page', url : material.link() },
				{label : 'Community', url : material.link() + '/wall' }
			]
		})	
	}
})
