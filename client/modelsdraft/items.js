define([
	'modelsdraft/item',	
	'backbone',		
	'backbone-relational'
], function(ItemModule, Backbone){
	var Items = Backbone.Collection.extend({
		model : ItemModule.Item
	})	
	return Items
})
