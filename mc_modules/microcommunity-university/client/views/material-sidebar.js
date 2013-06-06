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
				{label : 'Home Page', url : material.link() },
				{label : 'Wall', url : material.link() + '/wall' },
				{label : 'Stream', url : material.link() + '/stream' }				
			]
		})	
	}
})
