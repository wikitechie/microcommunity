define([
	'modelsdraft/item',	
	'modelsdraft/items',	
	'backbone',
	'backbone-relational'
], function(Item, Items, Backbone){

	var Stream = Backbone.RelationalModel.extend({
	
		relations : [
			{
				type : Backbone.HasMany,
				key : 'items',
				relatedModel : Item,
				collectionType : Items,
				includeInJSON : Backbone.Model.prototype.idAttribute,				
				/* reverseRelation : {
					key : 'stream',
					includeInJSON : Backbone.Model.prototype.idAttribute,														
				} */
			}						
		]
				
	})
	
	return Stream
	
	
})
