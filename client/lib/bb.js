define([
	'text!templates/item.html',
	'backbone',
	'backbone-relational',
	'backbone-marionette',
	'jquery',
	'jquery.gravatar',
	'jquery.spin',
	'general',
	'moment'
], function(html, Backbone){

	Backbone.Marionette.Renderer.render = function(template, data){
		return _.template(template, data)
	}
	
	return Backbone	
})
