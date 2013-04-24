define([
	'app',
	'models/index',
	'views/sidebars/basic',
	'views/new-wiki',
	'views/wikis',	
	'models/wiki',
	'models/wikis',
], function(App, Models, basicSidebar, newWikiForm, WikisView, Wiki, Wikis){

	App.addRegions({
		mainSidebar : '#main-sidebar-region',
		wikiForm : '#new-wiki-form-region',
		wikis : '#wikis-region'
	})
	
	var wikis = new Wikis(server.data.wikis)		
	App.wikis.show(new WikisView({ collection : wikis }))
	
	if (App.currentUser.id){
		App.wikiForm.show(new newWikiForm())	
	}	
		
	return App
	
});

