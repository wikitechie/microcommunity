define([
	'bb',
	'text!components/activity/templates/content.html'
], function(Backbone, html){

	var ActivityView = Backbone.Marionette.ItemView.extend({	
		template : html
	})
	
	return ActivityView
	
})
