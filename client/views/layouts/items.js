define([
	'bb',
	'text!templates/layouts/items.html'
],function(Backbone, html){

	var ItemsLayout = Backbone.Marionette.Layout.extend({
		template : html,
		regions : {
			publisher : '#publisher',
			stream : '#stream'
		}
	})
	
	return ItemsLayout
	
})
