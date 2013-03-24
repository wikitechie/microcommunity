define([
	'modelsdraft/item',	
	'modelsdraft/items',	
	'modelsdraft/user',		
	'backbone',
	'backbone-relational'
], function(ItemModule, Items, User, Backbone){

	var Wall = Backbone.RelationalModel.extend({
		urlRoot : '/api/walls',
		
		relations : [
			{
				type : Backbone.HasMany,
				key : 'items',
				relatedModel : ItemModule.Item,
				collectionType : Items,
				includeInJSON : Backbone.Model.prototype.idAttribute,				
				reverseRelation : {
					key : 'wall',
					includeInJSON : Backbone.Model.prototype.idAttribute,																			
				}
			},
			{
				type : Backbone.HasOne,
				key : 'owner',
				relatedModel : User,
				includeInJSON : Backbone.Model.prototype.idAttribute,				
				reverseRelation : {
					key : 'wall',
					type : Backbone.HasOne,					
					includeInJSON : Backbone.Model.prototype.idAttribute,														
				}
			}			
		]
				
	})
	
	
	return Wall
	
	
})
