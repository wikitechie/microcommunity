define([
	'models/index',
	'modules/publisher',
	'modules/stream',
	'views/sidebars/basic',
	'views/sidebars/new-wikipage',
	'models/wiki'	
], function(Models, publiserhModule, streamModule, basicSidebar, newWikipageSidebar, Wiki){

	var App = new Backbone.Marionette.Application()	
	
	App.currentUser = new Models.User(server.currentUser)

	App.addRegions({
		mainSidebar : '#main-sidebar-region',
		newWikipageSidebar : '#new-wikipage-sidebar-region',
		publisher : '#publisher-region',
		stream : '#stream-region'
	})	
	
	var wiki = new Wiki(server.data.wiki)
	
	App.mainSidebar.show(new basicSidebar())
	if (App.currentUser.id){
		App.newWikipageSidebar.show(new newWikipageSidebar({ model : wiki }))		
	}	
	
	if (App.currentUser.id){
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

