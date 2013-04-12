define([
	'bb',
	'text!./template.html'
],function(Backbone, html){

	var PostView = Backbone.Marionette.ItemView.extend({	
		template : html
	})
	
	return PostView
	
})
