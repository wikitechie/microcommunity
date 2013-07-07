define([
	'bb',
	'models/item',
	'models/homework',
	'text!components/new-homework-activity/templates/wall-message.html',
	'text!components/new-homework-activity/templates/stream-message.html'		
], function(Backbone, Item, Homework, messageTemplateWall, messageTemplateStream){
	
	var Activity = Item.extend({
		messageTemplate : function(type, wall){
			if (wall && wall.get('owner').$ref == 'homeworks')
				return messageTemplateWall			
			else 
				return messageTemplateStream
		},
		serialize : function(){		
			var parent = Item.prototype.serialize.apply(this)	
			return _.extend(parent, { homework : this.get('homework').serialize() })
		},
		relations : [
			{
				type : Backbone.HasOne,
				key : 'homework',
				relatedModel : Homework
			}
		]
	})		
	return Activity
})
