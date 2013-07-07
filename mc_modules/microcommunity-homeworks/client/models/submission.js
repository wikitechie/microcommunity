define([
	'bb'
], function(Backbone){

	var Submission = Backbone.RelationalModel.extend({
		idAttribute : '_id',
		urlRoot : function(){
			return '/api/homeworks/' + this.get('homework') + '/submissions'
		}	
	})
	
	return Submission
	
})
