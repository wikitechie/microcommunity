define([
	'models/comment',
	'bb'
], function(Comment, Backbone){

	var Comments = Backbone.Collection.extend({
		model : Comment	
	})
		
	return Comments
	
})
