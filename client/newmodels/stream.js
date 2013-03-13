define([
	'newmodels/activity',
	'backbone',
	'backbone-relational'
], function(Activity, Backbone){

	Stream = Backbone.Collection.extend({
		model : Activity
	})		
	
	return Stream
})
