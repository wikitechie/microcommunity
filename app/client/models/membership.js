define([
	'bb',
], function(Backbone){

	var Membership = Backbone.RelationalModel.extend({
		idAttribute : '_id',
		urlRoot : function(){
			return '/api/materials/' + this.get('material') + '/memberships'
		}			
	})
		
	return Membership
	
})
