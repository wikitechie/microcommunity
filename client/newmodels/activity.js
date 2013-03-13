define([
	'backbone',
	'backbone-relational'
], function(Backbone){

	Activity = Backbone.RelationalModel.extend({
	
		constructor: function (attributes, options){
			var objectTypes = {
				'post' : 'Item',
				'wikipage' : 'WikiPage'
			}		
			var type = attributes.subtype
			if (type){
				this.relations[1] = {
					type : Backbone.HasOne,				
					key : "object",
					relatedModel : objectTypes[type],
					includeInJSON : [ Backbone.Model.prototype.idAttribute, 'objectType' ]
				}
			}						
			Backbone.RelationalModel.prototype.constructor.apply(this, arguments)		
		},
	
		defaults : {
			created : Date(),
			objectType : 'activity',
		},
		
		subModelTypeAttribute : 'subtype',
			
		relations : [
			{
				type : Backbone.HasOne,
				key : 'actor',
				relatedModel : 'User',
				includeInJSON : Backbone.Model.prototype.idAttribute
			}			
		],
		
		subModelTypes : {
			'post' : 'PostActivity',
			'wikipage' : 'WikiPageActivity'
		}
		
	})
	
	return Activity
})
