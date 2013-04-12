define([
	'bb',
	'text!templates/photo.html'
],function(Backbone, html){

	var PhotoView = Backbone.Marionette.ItemView.extend({	
		template : html
		
	})
	
	return PhotoView
	
})
