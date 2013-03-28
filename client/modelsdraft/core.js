define([
	'backbone',
	'backbone-relational'
], function(Backbone){

	User = Backbone.RelationalModel.extend({
	})

	Item = Backbone.RelationalModel.extend({
		subModelTypeAttribute : 'itemType',
		subModelTypes : {
			'post' : 'Post'
		},
		defaults : {
			objectType : 'item'
		},
		relations : [
			{
				type : Backbone.HasOne,
				key : 'author',
				relatedModel : 'User',
				includeInJSON : Backbone.Model.prototype.idAttribute
			},
			{
				type : Backbone.HasOne,
				key : 'wall',
				relatedModel : 'Wall',
				includeInJSON : Backbone.Model.prototype.idAttribute
			}				
		]						
	})

	Items = Backbone.Collection.extend({
		model : Item
	})

	Post = Item.extend({
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
	//building an instance in order to setup relations	
	var post = new Post()
	Backbone.Relational.store.reset()							

	Wall = Backbone.RelationalModel.extend({
		relations : [
			{
				type : Backbone.HasMany,
				key : 'items',
				relatedModel : 'Item',
				collectionType : 'Items',
				includeInJSON : Backbone.Model.prototype.idAttribute,
			},
			{
				type : Backbone.HasOne,
				key : 'owner',
				relatedModel : 'User',
				includeInJSON : Backbone.Model.prototype.idAttribute,				
				reverseRelation : {
					key : 'wall',
					type : Backbone.HasOne,					
					includeInJSON : Backbone.Model.prototype.idAttribute,														
				}
			}			
		]	
	})

	Stream = Backbone.RelationalModel.extend({	
		relations : [
			{
				type : Backbone.HasMany,
				key : 'items',
				relatedModel : 'Item',
				collectionType : 'Items',
				includeInJSON : Backbone.Model.prototype.idAttribute,				
				reverseRelation : {
					key : 'stream',
					includeInJSON : Backbone.Model.prototype.idAttribute,														
				}
			}						
		]				
	})
	
})
