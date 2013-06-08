define([
	'bb',
	'models/attachement'
], function(Backbone, Attachement){

	var Section = Backbone.RelationalModel.extend({
		idAttribute : '_id',
		urlRoot : function(){
			return '/materials/' + this.get('material') + '/sections'
		},
		relations : [
			{
				type : Backbone.HasMany,
				key : 'attachements',
				relatedModel : Attachement
			}			
		]			
	})
	
	return Section
	
})
