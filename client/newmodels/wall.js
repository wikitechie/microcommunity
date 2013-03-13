define([
	'backbone',
	'backbone-relational'
], function(Backbone){

	return Wall = Backbone.RelationalModel.extend({
		
		relations : [
			{
				type : Backbone.HasMany,
				key : 'items',
				relatedModel : 'Item',
				collectionType : 'Items',
				includeInJSON : Backbone.Model.prototype.idAttribute,				
				reverseRelation : {
					key : 'parentWall',
					includeInJSON : Backbone.Model.prototype.idAttribute,														
				}
			}, 			
			{
				type : Backbone.HasOne,
				key : 'owner',
				relatedModel : 'User',
				includeInJSON : Backbone.Model.prototype.idAttribute,				
				reverseRelation : {
					key : 'wall',
					includeInJSON : Backbone.Model.prototype.idAttribute,														
				}
			}, 			
		]
				
	})
	
	
})
