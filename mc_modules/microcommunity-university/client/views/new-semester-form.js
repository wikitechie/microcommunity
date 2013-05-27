define([
	'bb',
	'text!templates/new-semester-form.html'
],function(Backbone, html){	
	var Form = Backbone.Marionette.ItemView.extend({	
		template : html
	})		
	return Form	
})
