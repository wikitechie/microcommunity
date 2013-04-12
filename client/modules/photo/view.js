define([
	'bb',
	'text!./template.html'
],function(Backbone, html){

	var PhotoView = Backbone.Marionette.ItemView.extend({	
		template : html
		
	})
	
	return PhotoView
	
})
