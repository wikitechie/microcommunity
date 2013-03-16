define([
	'backbone',
	'modelsdraft/item',	
	'backbone-relational'
], function(Backbone, Item){

	return Items = Backbone.Collection.extend({
		model : Item
	})

})
