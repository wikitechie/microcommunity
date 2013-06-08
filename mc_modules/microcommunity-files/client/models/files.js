define([
	'bb',
	'models/file'
], function(Backbone, File){

	var Files = Backbone.Collection.extend({
		model : File			
	})	
	return Files
	
})
