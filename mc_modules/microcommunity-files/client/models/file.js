define([
	'bb',
], function(Backbone){

	var File = Backbone.RelationalModel.extend({
		idAttribute : '_id',
		link : function(){
			return '/files/' + this.id
		},
	})
	
	return File
	
})
