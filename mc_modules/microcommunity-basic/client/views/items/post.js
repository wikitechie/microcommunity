define([
	'bb',
	'text!templates/items/post.html'
],function(Backbone, html){

	var PostView = Backbone.Marionette.ItemView.extend({	
		template : html
	})
	
	return PostView
	
})
