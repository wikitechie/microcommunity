define([
	'backbone',
	'backbone-relational',
	'backbone-validation'
], function(Backbone){

	Item = Backbone.RelationalModel.extend({
		urlRoot : 'asdf',						
		subModelTypes : {
			'post' : 'PostItem'
		}				
	})
	
	PostItem = Item.extend({
		defaults : {
			content : "This is a post"
		}
	})
	
	return Item
})
