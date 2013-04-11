define([
	'models/item',
	'bb'
],function(Item, Backbone){

	var Items = Backbone.Collection.extend({
		model : Item,
		initialize : function(models, options){
			this.type = options.type
		}		
	})
		
	return Items

})
