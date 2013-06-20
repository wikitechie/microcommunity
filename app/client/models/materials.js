define([
	'bb',
	'models/material'
],function(Backbone, Material){

	var Materials = Backbone.Collection.extend({
		model : Material			
	})
	
	return Materials
	
})
