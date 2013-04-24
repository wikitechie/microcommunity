define([
	'app',
	'views/wiki-sidebar',
	'views/sidebars/new-wikipage',
	'views/wikipage',
	'modules/publisher',
	'modules/stream',	
	'models/wikipage'
], function(App, WikiSidebar, NewWikipageSidebarView, WikipageView, publiserhModule, streamModule, Wikipage){

	App.addRegions({
		wikiSidebar : '#wiki-sidebar-region',
		newWikipageSidebar : '#new-wikipage-sidebar-region',		
	})
	
	App.addInitializer(function(){	
		var wikiSidebar = WikiSidebar(server.data.wiki)	
		App.wikiSidebar.show(wikiSidebar)		
		var sidebarView = NewWikipageSidebarView(server.data.wiki)
		this.newWikipageSidebar.show(sidebarView)		
	})
	
	return App
})
