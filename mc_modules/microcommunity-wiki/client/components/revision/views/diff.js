define([
	'bb',
	'text!components/revision/templates/diff.html',
], function(Backbone, html){

	var DiffView = Backbone.Marionette.ItemView.extend({	
		template : html
	})
	
	return DiffView
	
})
