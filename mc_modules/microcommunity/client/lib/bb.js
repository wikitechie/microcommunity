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
	
	Backbone.Model.prototype.can  =  function(action){
		if (this.get('can')) 
			return this.get('can')[action] 
		else
			return false
	}	
	
	return Backbone
		
})
