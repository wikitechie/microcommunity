define([
	'bb',
],function(Backbone){

	var User = Backbone.RelationalModel.extend({
		idAttribute : '_id',
		link : function(){
			return "/profiles/" + this.id
		},		
	})	
	return User
	
})
