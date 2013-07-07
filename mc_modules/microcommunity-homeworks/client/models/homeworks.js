define([
	'bb',
	'models/homework'
],function(Backbone, Homework){

	var Homeworks = Backbone.Collection.extend({
		model : Homework			
	})
	
	return Homeworks
	
})
