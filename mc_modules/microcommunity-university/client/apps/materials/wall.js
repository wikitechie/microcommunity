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
		publisher : '#publisher-region',
		stream : '#stream-region'
	})	
	
	var wiki = Wiki.findOrCreate(server.data.container)	
	
	App.addInitializer(function(){	
		var wikiSidebar = WikiSidebar(server.data.container)	
		App.wikiSidebar.show(wikiSidebar)	
		var sidebarView = NewWikipageSidebarView(server.data.container)
		this.newWikipageSidebar.show(sidebarView)					
	})
	
	if (App.isLoggedIn()){
		var options = {
			wall : wiki.get('wall'),
			identifier : 'wiki-wall'
		}
		var Publisher = publiserhModule(App, options, function(view){
			App.publisher.show(view)
		})
		
		App.vent.on('publisher:newitem', function(item){				
			Stream.add(item) 
		})		
	}
	
	var options = { 
		items : server.data.items, 
		type : 'wall',
		wall : wiki.get('wall')
	}
		
	var Stream = streamModule(App, options, function(view){
		App.stream.show(view)
	})
		
	return App
	
});

