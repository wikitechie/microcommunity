define([
	'app',
	'views/material-sidebar',	
	'views/sidebars/new-wikipage',		
	'views/wikipage',
	'modules/publisher',
	'modules/stream',	
	'models/wikipage',
	'views/publishers/post',
], function(App, MaterialSidebar, NewWikipageSidebarView, WikipageView, publiserhModule, streamModule, Wikipage, PostPublisher){

	var wikipage = Wikipage.findOrCreate(server.data.wikipage)
		
	App.addInitializer(function(){	
		App.wikipage.show(new WikipageView({ model : wikipage }))
	})	
	
	App.addRegions({
		wikipage : '#wikipage-region',
		publisher : '#publisher-region',
		wall : '#wall-region'	
	})
		
	if (wikipage.get('wall').can('publish')){
		var options = {
			wall : wikipage.get('wall'),
			identifier : 'wikipage-wall',
			publishers : [PostPublisher]
		}		
		var Publisher = publiserhModule(App, App.publisher, options)		
	}
	
	wikipage.get('wall').set('items', server.data.items)
	var Stream = streamModule(App, App.wall, wikipage.get('wall'))	
	
	return App
	
})
