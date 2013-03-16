define([
	'modelsdraft/user',		
	'backbone',
	'backbone-relational'
], function(User, Backbone){

	Item = Backbone.RelationalModel.extend({
		urlRoot : '/api/items',			
		subModelTypeAttribute : 'itemType',							
		subModelTypes : {
			'post' : 'Item.Post',
		},		
		defaults : {
			objectType : 'item'
		},		
		relations : [
			{
				type : Backbone.HasOne,
				key : 'author',
				relatedModel : User,
				includeInJSON : Backbone.Model.prototype.idAttribute
			}				
		]									
	})	
	
	Item.Post = Item.extend({
		urlRoot : '/api/posts',		
		msg : function(){			
			var msg						
			if ( this.get('wall').id == this.get('author').get('wall').id )	
				msg = ' posted on his wall '
			else
				msg = ' posted on ' 
					+ this.get('wall').get('owner').get('name') 
					+ '\'s wall '
			
			return this.get('author').get('name') 
				+ msg 
				+ this.get('content')		
		}						
	})	
		
	return Item
})
