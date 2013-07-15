define([
	'bb'
], function(Backbone){

	var Stream = Backbone.RelationalModel.extend({	
		idAttribute : '_id',				
		urlRoot : '/api/streams/',
		defaults : {
			objectType : 'stream'
		},
		serialize : function(){
			return _.extend(this.toJSON())
		},		
		relations : [
			{
				type : Backbone.HasMany,
				key : 'items',
				relatedModel : 'Core.Item',
				collectionType : 'Core.Items',
				/*reverseRelation : {
					type : Backbone.HasOne,
					key : 'parent',
					includeInJSON : false
				}*/
			}		
		]
		
	})
	
	return Stream
	
})
