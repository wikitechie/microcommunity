define([
	'text!templates/item.html',
	'backbone',
	'backbone-relational',
	'backbone-marionette'	
], function(html, Backbone){

	Backbone.Marionette.Renderer.render = function(template, data){
		return _.template(template, data)
	}
	
	return Backbone	
})
