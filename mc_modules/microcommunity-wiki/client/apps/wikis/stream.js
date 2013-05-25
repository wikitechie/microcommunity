define([
	'app',
	'views/wiki-sidebar',
	'views/sidebars/new-wikipage',	
	'models/index',
	'modules/publisher',
	'modules/stream',
	'views/sidebars/basic',
	'views/sidebars/new-wikipage',
	'models/wiki'	
], function(App, WikiSidebar, NewWikipageSidebarView, Models, publiserhModule, streamModule, basicSidebar, newWikipageSidebar, Wiki){

	App.addRegions({
		wikiSidebar : '#wiki-sidebar-region',	
		newWikipageSidebar : '#new-wikipage-sidebar-region',
		stream : '#stream-region'
	})	
	
	App.addInitializer(function(){	
		var wikiSidebar = WikiSidebar(server.data.container)	
		App.wikiSidebar.show(wikiSidebar)	
		var sidebarView = NewWikipageSidebarView(server.data.container)
		this.newWikipageSidebar.show(sidebarView)					
	})
	
	var options = { 
		items : server.data.items, 
		type : 'stream'
	}		
	var Stream = streamModule(App, options, function(view){
		App.stream.show(view)
	})
		
	return App
	
});

