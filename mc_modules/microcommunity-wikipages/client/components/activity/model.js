define([
	'bb',
	'models/item',
	'models/wikipage',
	'components/activity/views/content',
	'text!components/activity/templates/wall-message.html',
	'text!components/activity/templates/stream-message.html'		
], function(Backbone, Item, Wikipage, ActivityView, messageTemplateWall, messageTemplateStream){
	
	var Activity = Item.extend({
		messageTemplate : function(parent){
			if (parent){
				if (parent.get('objectType') === 'wall' && parent.get('owner').$ref == 'wikipages')
					return messageTemplateWall		
			} else
				return messageTemplateStream			
		},
		serialize : function(){		
			var parent = Item.prototype.serialize.apply(this)		
			return _.extend(parent, { wikipage : this.get('wikipage').serialize() })
		},
		contentView : function(parent){
			if (parent){
				if (parent.get('objectType') === 'wall' && parent.get('owner').$ref == 'wikipages')
					return false		
			} else
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
