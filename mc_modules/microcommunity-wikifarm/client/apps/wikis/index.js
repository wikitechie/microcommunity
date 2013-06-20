define([
	'app',
	'models/index',
	'views/sidebars/basic',
	'views/new-wiki',
	'views/thumbnails',
	'models/wikis',
], function(App, Models, basicSidebar, newWikiForm, Thumbnails, Wikis){

	App.addRegions({
		mainSidebar : '#main-sidebar-region',
		wikiForm : '#new-wiki-form-region',
		wikis : '#wikis-region'
	})
	
	var wikis = new Wikis(server.data.containers)		
	App.wikis.show(new Thumbnails({ collection : wikis }))
	
	if (App.isLoggedIn()){
		App.wikiForm.show(new newWikiForm())	
	}
		
	return App
	
});

