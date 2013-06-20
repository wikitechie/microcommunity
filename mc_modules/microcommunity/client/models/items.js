define([
	'models/item',
	'bb'
],function(Item, Backbone){

	var Items = Backbone.Collection.extend({
		model : Item,
		initialize : function(models, options){
			if (options && options.type)
				this.type = options.type
		}		
	})
		
	return Items

})
