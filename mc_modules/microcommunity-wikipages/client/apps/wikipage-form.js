define([
	'app',
	//'views/wiki-sidebar',
	//'views/sidebars/new-wikipage',
	'views/material-sidebar',	
	'views/wikipage',
	'modules/publisher',
	'modules/stream',	
	'models/wikipage'
], function(App, MaterialSidebar, WikipageView, publiserhModule, streamModule, Wikipage){

	App.addRegions({
		materialSidebar : '#material-sidebar-region',	
		wikiSidebar : '#wiki-sidebar-region',
		newWikipageSidebar : '#new-wikipage-sidebar-region',		
	})
	
	/* App.addInitializer(function(){	
		var wikiSidebar = WikiSidebar(server.data.wiki)	
		App.wikiSidebar.show(wikiSidebar)		
		var sidebarView = NewWikipageSidebarView(server.data.wiki)
		this.newWikipageSidebar.show(sidebarView)		
	})*/
	
	App.addInitializer(function(){
		App.materialSidebar.show(new MaterialSidebar(server.currentContainer))		
	})	
	
	return App
})
