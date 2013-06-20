define([
	'backbone',
	'backbone-relational',
	'backbone-marionette',
	'jquery',
	'jquery.gravatar',
	'jquery.spin',
	'general',
	'moment',
	'bootstrap'
], function(Backbone){

	Backbone.Marionette.Renderer.render = function(template, data){
		return _.template(template, data)
	}
	
	return Backbone	
})
