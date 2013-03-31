define([
	'bb',
],function(Backbone){

	var Wall = Backbone.RelationalModel.extend({
	
		relations : [
			{
				type : Backbone.HasMany,
				key : 'items',
				relatedModel : 'Core.Item',
				collectionType : 'Core.Items',
				includeInJSON : Backbone.Model.prototype.idAttribute,				
				reverseRelation : {
					key : 'wall',
					type : Backbone.HasOne,					
					includeInJSON : Backbone.Model.prototype.idAttribute,														
				}			
			},
			{
				type : Backbone.HasOne,
				key : 'owner',
				relatedModel : 'Core.User',
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
