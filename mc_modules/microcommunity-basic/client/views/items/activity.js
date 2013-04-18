define([
	'bb',
	'text!templates/items/activity.html'
], function(Backbone, html){

	var ActivityView = Backbone.Marionette.ItemView.extend({	
		template : html
	})
	
	return ActivityView
	
})
