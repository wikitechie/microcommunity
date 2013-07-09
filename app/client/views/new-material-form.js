define([
	'bb',
	'text!templates/new-material-form.html'
], function(Backbone, html){	

	var NewMaterialForm = Backbone.Marionette.ItemView.extend({	
		template : html
	})		
	return NewMaterialForm	
})
