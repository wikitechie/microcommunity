define([
	'bb',
	'models/item',
	'models/wikipage',
	'components/activity/views/content',
	'text!components/activity/templates/wall-message.html',
	'text!components/activity/templates/stream-message.html'		
], function(Backbone, Item, Wikipage, ActivityView, messageTemplateWall, messageTemplateStream){
	
	var Activity = Item.extend({
		messageTemplate : function(type){
			if (type == 'wall')
				return messageTemplateWall
			else
				return messageTemplateStream
		},
		contentView : function(type){
			if (type == 'wall')
				return false
			else
				return ActivityView
		},
		relations : [
			{
				type : Backbone.HasOne,
				key : 'wikipage',
				relatedModel : Wikipage
			}
		]
	})		
	return Activity
})
