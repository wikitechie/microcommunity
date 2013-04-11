define([
	'bb',
	'models/item'
],function(Backbone, Item){

	var Wall = Backbone.RelationalModel.extend({	
		idAttribute : '_id',	
		relations : [
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
