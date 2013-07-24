define([
	'bb',
], function(Backbone){

	var Attachement = Backbone.RelationalModel.extend({
		idAttribute : '_id',
		urlRoot : function(){
			return '/api/materials/' + this.get('material') + '/sections/' + this.get('section') + '/attachements'	
		}
	})
	
	return Attachement
	
})
