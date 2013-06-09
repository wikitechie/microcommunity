define([
	'app',
	//'views/wiki-sidebar',
	'views/material-sidebar',	
	'views/sidebars/new-wikipage',		
	'views/wikipage',
	'modules/publisher',
	'modules/stream',	
	'models/wikipage'
], function(App, MaterialSidebar, NewWikipageSidebarView, WikipageView, publiserhModule, streamModule, Wikipage){

	var wikipage = Wikipage.findOrCreate(server.data.wikipage)
		
	App.addInitializer(function(){	
		App.wikipage.show(new WikipageView({ model : wikipage }))
	})	
	
	App.addRegions({
		materialSidebar : '#material-sidebar-region',	
		newWikipageSidebar : '#new-wikipage-sidebar-region',	
		wikiSidebar : '#wiki-sidebar-region',
		wikipage : '#wikipage-region',
		publisher : '#publisher-region',
		wall : '#wall-region'	
	})
	
	/* App.addInitializer(function(){	
		var wikiSidebar = WikiSidebar(server.data.wikipage.wiki)	
		App.wikiSidebar.show(wikiSidebar)	
		var sidebarView = NewWikipageSidebarView(server.data.wikipage.wiki)
		this.newWikipageSidebar.show(sidebarView)					
	}) */
	
	App.addInitializer(function(){
		App.materialSidebar.show(new MaterialSidebar(server.data.wikipage.container))		
	})
	
	if (App.currentUser){
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
	}
		
	var options = { 
		items : server.data.items, 
		type : 'wall',
		wall : wikipage.get('wall')
	}
	
	var Stream = streamModule(App, options, function(view){
		App.wall.show(view)
	})
	
	return App
})
