define([
	'bb',
	'views/wikipage'
], function(Backbone, WikipageView){
	var App = new Backbone.Marionette.Application()
	
	App.addRegions({
		wikipage : '#wikipage-region',
		wall : '#wikipage-wall-region'	
	})
	
	App.addInitializer(function(){	
		App.wikipage.show(new WikipageView())
	})
	
	return App
})
