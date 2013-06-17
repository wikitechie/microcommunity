define([
	'app',
	'models/index',
	'views/sidebars/basic',
	'views/new-material-form',
	'views/thumbnails',
	'models/materials',
], function(App, Models, basicSidebar, MaterialForm, Thumbnails, Materials){

	App.addRegions({
		mainSidebar : '#main-sidebar-region',
		materials : '#materials-region'
	})
	
	App.addInitializer(function(){
		var materials = new Materials(server.data.containers)		
		App.materials.show(new Thumbnails({ collection : materials }))		
	})

	return App
	
});

