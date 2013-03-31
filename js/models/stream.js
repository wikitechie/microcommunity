define([
	'bb',
],function(Backbone){

	var Stream = Backbone.RelationalModel.extend({	
		relations : [
			{
				type : Backbone.HasMany,
				key : 'items',
				relatedModel : 'Core.Item',
				collectionType : 'Core.Items',
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
