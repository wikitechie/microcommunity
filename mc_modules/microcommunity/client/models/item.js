define([
	'backbone',
	'backbone-relational'
], function(Backbone){

	var Item = Backbone.RelationalModel.extend({
		idAttribute : '_id',
		
		//TODO validate author and wall: validate : function(){}
		
		url : function(){
			return '/api/publishers/' + this.get('identifier') + '/' + this.collection
		},
		
		serialize : function(){
			if (this.get('wall'))
				var wall = this.get('wall').serialize()
					
			return _.extend(this.toJSON(), {
				author: this.get('author').serialize(),
				wall : wall,
				parentType : this.collection.type
			})
		},		
		
		subModelTypeAttribute : 'objectType',
		subModelTypes : server.itemModulesInfo.subModelTypes,
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
