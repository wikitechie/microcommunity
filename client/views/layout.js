define([
	'bb',
	'text!templates/layout.html'
],function(Backbone, html){

	var Layout = Backbone.Marionette.Layout.extend({
		template : html,
		regions : {
			publisher : '#publisher',
			items : '#items'
		}
	})
	
	return Layout
	
})
