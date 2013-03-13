define([
	'backbone',
	'backbone-relational'
], function(Backbone){

	Activity = Backbone.RelationalModel.extend({	
	
		defaults : {
			created : Date()
		},
	
		relations : [
			{
				type : Backbone.HasOne,
				key : 'actor',
				relatedModel : 'User',
				includeInJSON : Backbone.Model.prototype.idAttribute
			},
			{
				type : Backbone.HasOne,
				key : 'item',
				relatedModel : 'PostItem',
				includeInJSON : Backbone.Model.prototype.idAttribute
			},
			
		],
		
		subModelTypes : {
			'post' : 'PostActivity',
			'revision' : 'RevisionActivity',
			'wikipage' : 'WikipageActivity'
		}
	})
	
	return Activity
})
