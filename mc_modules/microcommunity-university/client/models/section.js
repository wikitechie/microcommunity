define([
	'bb',
], function(Backbone){

	var Section = Backbone.RelationalModel.extend({
		idAttribute : '_id',
		urlRoot : function(){
			return '/materials/' + this.get('material') + '/sections'
		}
	})
	
	return Section
	
})
