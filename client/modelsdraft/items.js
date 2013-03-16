define([
	'modelsdraft/item',	
	'backbone',		
	'backbone-relational'
], function(Item, Backbone){
	var Items = Backbone.Collection.extend({
		model : Item
	})	
	return Items
})
