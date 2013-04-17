define([
	'app',
	'views/wikipage',
	'modules/publisher',
	'modules/stream',	
	'models/wikipage'
], function(MCApp, WikipageView, publiserhModule, streamModule, Wikipage){

	var App = new MCApp()
	App.setup(server)
		
	var wikipage = new Wikipage(server.data.wikipage)
		
	App.addInitializer(function(){	
		App.wikipage.show(new WikipageView({ model : wikipage }))
	})	
	
	App.addRegions({
		wikipage : '#wikipage-region',
		publisher : '#publisher-region',
		wall : '#wall-region'	
	})
	
	if (App.currentUser){
		var Publisher = publiserhModule(App, wikipage.get('wall'), function(view){
			App.publisher.show(view)
		})	
		App.vent.on('publisher:newitem', function(item){				
			Stream.add(item) 
		})			
			
	}	
	var Stream = streamModule(App, { items : server.data.items, type : 'wall' }, function(view){
		App.wall.show(view)
	})	
	

	
	return App
})
