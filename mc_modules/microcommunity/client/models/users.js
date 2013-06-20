define([
	'models/user',
	'bb'
], function(User, Backbone){

	var Users = Backbone.Collection.extend({
		model : User	
	})
		
	return Users
	
})
