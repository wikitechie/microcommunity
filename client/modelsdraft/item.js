define([
	'backbone',
	'backbone-relational'
], function(Backbone){

	Item = Backbone.RelationalModel.extend({
		urlRoot : '/api/items',	
		
		subModelTypeAttribute : 'itemType',	
						
		subModelTypes : {
			'post' : 'Post',
		},
		
		defaults : {
			objectType : 'item'
		},
		
		relations : [
			{
				type : Backbone.HasOne,
				key : 'author',
				relatedModel : 'User',
				includeInJSON : Backbone.Model.prototype.idAttribute
			}			
		]	
								
	})
	
	return Item
})
