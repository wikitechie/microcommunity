define([
	'bb',
	'text!templates/new-wiki.html'
],function(Backbone, html){	
	var NewWikiForm = Backbone.Marionette.ItemView.extend({	
		template : html
	})		
	return NewWikiForm	
})
