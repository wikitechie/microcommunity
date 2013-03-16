define([
	'modelsdraft/user',		
	'backbone',
	'backbone-relational'
], function(User, Backbone){

	var Item = Backbone.RelationalModel.extend({
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
				relatedModel : User,
				includeInJSON : Backbone.Model.prototype.idAttribute
			}			
		]									
	})
		
	return Item
})
