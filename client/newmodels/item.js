define([
	'backbone',
	'backbone-relational'
], function(Backbone){

	Item = Backbone.RelationalModel.extend({
		urlRoot : 'asdf',	
		subModelTypeAttribute : 'subtype',					
		subModelTypes : {
			'post' : 'PostItem'
		},
		defaults : {
			objectType : 'item'
		}						
	})
	
	return Item
})
