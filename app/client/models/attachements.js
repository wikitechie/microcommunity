define([
	'bb',
	'models/attachement'
], function(Backbone, Attachement){

	var Attachements = Backbone.Collection.extend({
		model : Attachement			
	})	
	return Attachements
	
})
