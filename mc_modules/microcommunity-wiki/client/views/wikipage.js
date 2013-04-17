define([
	'bb',
	'text!templates/wikipage.html'
],function(Backbone, html){

	var WikipageView = Backbone.Marionette.ItemView.extend({	
		template : html	
	})	
	
	return WikipageView	
})
