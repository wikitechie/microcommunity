define([
	'bb',
	'text!templates/wiki.html'
], function(Backbone, html){

	var WikiView = Backbone.Marionette.ItemView.extend({
		template : html
	})

	var WikisView = Backbone.Marionette.CompositeView.extend({
		className : 'row',
		template : '',
		itemView : WikiView			 
	})
		
	return WikisView	
})
