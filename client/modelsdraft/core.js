define([
	'backbone',
	'backbone-relational'
], function(Backbone){

	Core = {}

	Core.User = Backbone.RelationalModel.extend({
	})

	Core.Item = Backbone.RelationalModel.extend({	
		constructor : function(){
		
			/* a small  hack in order to prevent the model from 
				 overriding the 'wall' reverseRelation which 
				 is set in the wall model */
				 
			var setup = true	 
			_.each(this.relations, function(relation){
				if (relation.key == 'author')
					setup = false			
			})
			
			if (setup) {
				this.relations.push({
					type : Backbone.HasOne,
					key : 'author',
					relatedModel : 'Core.User',
					includeInJSON : Backbone.Model.prototype.idAttribute	
				})			
			}		
			
			Backbone.RelationalModel.prototype.constructor.apply(this, arguments)
		},
		
		subModelTypeAttribute : 'itemType',
		subModelTypes : {
			'post' : 'Core.Post'
		},
		defaults : {
			objectType : 'item'
		}				
	})

	Core.Items = Backbone.Collection.extend({
		model : Core.Item
	})

	Core.Post = Core.Item.extend({
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
	var post = new Core.Post()

	
	Core.Wall = Backbone.RelationalModel.extend({
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

	Core.Stream = Backbone.RelationalModel.extend({	
		relations : [
			{
				type : Backbone.HasMany,
				key : 'items',
				relatedModel : 'Core.Item',
				collectionType : 'Core.Items',
				includeInJSON : Backbone.Model.prototype.idAttribute,				
				reverseRelation : {
					key : 'stream',
					includeInJSON : Backbone.Model.prototype.idAttribute,														
				}
			}						
		]				
	})
	
	return Core
	
})
