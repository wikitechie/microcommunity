define([
	'backbone',
	'backbone-relational'
], function(Backbone){

	var Item = Backbone.RelationalModel.extend({
		idAttribute : '_id',	
		urlRoot : function(){
			return '/api/walls/' + this.get('wall').id + '/items'
		},
		
		initialize : function(attr, options){
			this.set('published', new Date())
		},
		
		serialize : function(){			 
			return _.extend(this.toJSON(), {
				author: this.get('author').serialize(),
				wall: this.get('wall').serialize(),
				parentType : this.collection.type
			})
		},		
		
		subModelTypeAttribute : 'itemType',
		subModelTypes : {
			'post' : 'Core.Post'
		},
		defaults : {
			objectType : 'item'
		},
		
		relations : [
			{
				type : Backbone.HasOne,
				key : 'wall',
				relatedModel : 'Core.Wall',
				includeInJSON : '_id'
			},
			{
				type : Backbone.HasOne,
				key : 'author',
				relatedModel : 'Core.User',
				includeInJSON : '_id'			
			}					
		]
						
	})
	
	return Item
	
})
