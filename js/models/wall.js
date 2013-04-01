define([
	'bb',
	'models/item'
],function(Backbone, Item){

	var Wall = Backbone.RelationalModel.extend({
	
		createPost : function( author, content, callback ){
			
			var post = {
				content : content,
				author : author,
				wall : this.id,
				itemType : 'post'
			}
			
			var self = this	
			
			App.wall.get('items').create(post, {
				success : function(model){
					//removing the old model which has no id
					App.wall.get('items').remove(model)
					//adding the new model
					App.wall.get('items').add(model)
					callback(null, model)
				}, wait : true
			})	
			
		},
	
		relations : [
			{
				type : Backbone.HasMany,
				key : 'items',
				relatedModel : 'Core.Item',
				collectionType : 'Core.Items',
				includeInJSON : Backbone.Model.prototype.idAttribute,								
				reverseRelation : {
					key : 'wall',
					type : Backbone.HasOne,					
					includeInJSON : Backbone.Model.prototype.idAttribute,														
				}
			},
			{
				type : Backbone.HasOne,
				key : 'owner',
				relatedModel : 'Core.User',
				includeInJSON : Backbone.Model.prototype.idAttribute,				
				reverseRelation : {
					key : 'wall',
					type : Backbone.HasOne,					
					includeInJSON : Backbone.Model.prototype.idAttribute,														
				}
			}			
		]	
	})
	
	return Wall
	
})
