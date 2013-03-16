define([
	'backbone',
	'backbone-relational'
], function(Backbone){

	return Stream = Backbone.RelationalModel.extend({
	
		relations : [
			{
				type : Backbone.HasMany,
				key : 'items',
				relatedModel : 'Item',
				collectionType : 'Items',
				includeInJSON : Backbone.Model.prototype.idAttribute,				
				/* reverseRelation : {
					key : 'stream',
					includeInJSON : Backbone.Model.prototype.idAttribute,														
				} */
			}						
		]
				
	})
	
	
})
