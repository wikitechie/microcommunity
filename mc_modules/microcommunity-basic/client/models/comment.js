define([
	'bb',
], function(Backbone){

	var Comment = Backbone.RelationalModel.extend({
		idAttribute : '_id'	,
		urlRoot : function(){
			return '/api/items/' + this.get('item') + '/comments'
		},
		serialize : function(){					
			return _.extend(this.toJSON(), { author: this.get('author').serialize()	})
		},
		relations : [
			{
				type : Backbone.HasOne,
				key : 'author',
				relatedModel : 'Core.User',
				includeInJSON : '_id'			
			}
		]
	})	
	return Comment
	
})
