define([
	'app',
	'views/wiki-sidebar',
	'views/sidebars/new-wikipage',
	'views/wikipage',
	'modules/publisher',
	'modules/stream',	
	'models/wikipage'
], function(App, WikiSidebar, NewWikipageSidebarView, WikipageView, publiserhModule, streamModule, Wikipage){

	//var wikipage = Wikipage.findOrCreate(server.data.wikipage)
		
	/* App.addInitializer(function(){	
		App.wikipage.show(new WikipageView({ model : wikipage }))
	})	*/
	
	App.addRegions({
		newWikipageSidebar : '#new-wikipage-sidebar-region',
		wikiSidebar : '#wiki-sidebar-region',	
		wikipage : '#wikipage-region',
		publisher : '#publisher-region',
		wall : '#wall-region'	
	})

	/*App.addInitializer(function(){	
		var wikiSidebar = WikiSidebar(server.data.wiki)	
		App.wikiSidebar.show(wikiSidebar)
		var sidebarView = NewWikipageSidebarView(server.data.wiki)
		this.newWikipageSidebar.show(sidebarView)		
	})*/
	
	/*if (App.currentUser){
		var options = {
			wall : wikipage.get('wall'),
			identifier : 'wikipage-wall'
		}	
		var Publisher = publiserhModule(App, options, function(view){
			App.publisher.show(view)
		})	
		App.vent.on('publisher:newitem', function(item){				
			Stream.add(item) 
		})			
	}*/
		
	/* var options = { 
		items : server.data.items, 
		type : 'wall',
		wall : wikipage.get('wall')
	}
	
	var Stream = streamModule(App, options, function(view){
		App.wall.show(view)
	})*/
	
	return App
})
