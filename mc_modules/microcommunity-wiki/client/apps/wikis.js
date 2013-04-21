define([
	'models/index',
	'views/sidebars/basic',
	'views/new-wiki',
	'views/wikis',	
], function(Models, basicSidebar, newWikiForm, WikisView){

	var App = new Backbone.Marionette.Application()	
	
	App.currentUser = new Models.User(server.currentUser)

	App.addRegions({
		mainSidebar : '#main-sidebar-region',
		wikiForm : '#new-wiki-form-region',
		wikis : '#wikis-region'
	})
	
	App.mainSidebar.show(new basicSidebar())
	
	var Wiki = Backbone.Model.extend()
	var Wikis = Backbone.Collection.extend({ model : Wiki })
	
	var wikis = new Wikis(server.data.wikis)
		
	App.wikis.show(new WikisView({ collection : wikis }))
	
	if (App.currentUser.id){
		App.wikiForm.show(new newWikiForm())	
	}	
		
	return App
	
});

