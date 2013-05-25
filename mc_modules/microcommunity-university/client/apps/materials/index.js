define([
	'app',
	'models/index',
	'views/sidebars/basic',
	'views/new-wiki',
	'views/thumbnails',
	'models/materials',
], function(App, Models, basicSidebar, newWikiForm, Thumbnails, Materials){

	App.addRegions({
		mainSidebar : '#main-sidebar-region',
		wikiForm : '#new-wiki-form-region',
		materials : '#materials-region'
	})
	
	var materials = new Materials(server.data.containers)		
	App.materials.show(new Thumbnails({ collection : materials }))
	
	if (App.isLoggedIn()){
		App.wikiForm.show(new newWikiForm())	
	}
		
	return App
	
});

