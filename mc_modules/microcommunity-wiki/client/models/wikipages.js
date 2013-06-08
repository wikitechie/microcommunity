define([
	'bb',
	'models/wikipage'
],function(Backbone, Wikipage){

	var Wikipages = Backbone.Collection.extend({
		model : Wikipage			
	})
	
	return Wikipages
	
})
