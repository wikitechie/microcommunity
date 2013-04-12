define([
	'bb',
	'text!templates/post.html'
],function(Backbone, html){

	var PostView = Backbone.Marionette.ItemView.extend({	
		template : html
	})
	
	return PostView
	
})
