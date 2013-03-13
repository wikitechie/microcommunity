define([
	'backbone',
	'backbone-relational'
], function(Backbone){

	Item = Backbone.RelationalModel.extend({
		urlRoot : 'asdf',						
		subModelTypes : {
			'post' : 'PostItem'
		}				
	})
	
	return Item
})
