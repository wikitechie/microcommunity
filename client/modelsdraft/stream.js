define([
	'modelsdraft/item',	
	'modelsdraft/items',	
	'backbone',
	'backbone-relational'
], function(ItemModule, Items, Backbone){

	var Stream = Backbone.RelationalModel.extend({
	
		relations : [
			{
				type : Backbone.HasMany,
				key : 'items',
				relatedModel : ItemModule.Item,
				collectionType : Items,
				includeInJSON : Backbone.Model.prototype.idAttribute,				
				reverseRelation : {
					key : 'stream',
					includeInJSON : Backbone.Model.prototype.idAttribute,														
				}
			}						
		]
				
	})
	
	return Stream
	
	
})
