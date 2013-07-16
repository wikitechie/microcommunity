define([
	'models/item',
	'bb'
],function(Item, Backbone){

	var Items = Backbone.Collection.extend({
		model : Item	
	})
		
	return Items

})
