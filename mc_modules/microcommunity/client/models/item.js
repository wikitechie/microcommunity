define([
	'backbone',
	'backbone-relational'
], function(Backbone){

	var Item = Backbone.RelationalModel.extend({
		idAttribute : '_id',
		
		//TODO validate author and wall: validate : function(){}
		url : function(){		
			return this.get('wall').url() + '/' + this.get('objectType')
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
