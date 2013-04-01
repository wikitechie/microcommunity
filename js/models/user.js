define([
	'bb',
],function(Backbone){

	var User = Backbone.RelationalModel.extend({
		idAttribute : '_id'
	})	
	return User
	
})
