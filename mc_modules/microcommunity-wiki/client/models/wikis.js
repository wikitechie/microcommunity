define([
	'bb',
	'models/wiki'
],function(Backbone, Wiki){

	var Wikis = Backbone.Collection.extend({
		model : Wiki			
	})
	
	return Wikis
	
})
