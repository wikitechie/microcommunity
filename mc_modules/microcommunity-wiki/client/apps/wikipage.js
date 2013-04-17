define([
	'app',
	'views/wikipage',
	'modules/publisher'
], function(MCApp, WikipageView, publiserhModule){

	var App = new MCApp()
	App.setup(server)
	
	App.addRegions({
		wikipage : '#wikipage-region',
		publisher : '#publisher-region',
		wall : '#wall-region'	
	})
	
	if (App.currentUser){
		var Publisher = publiserhModule(App, App.currentUser.get('wall'), function(view){
			App.publisher.show(view)
		})			
	}
		
	App.addInitializer(function(){	
		App.wikipage.show(new WikipageView())
	})
	
	return App
})
