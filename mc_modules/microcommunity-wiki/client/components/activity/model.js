define([
	'bb',
	'models/item',
	'activity/views/content',
	'text!activity/templates/message.html'
], function(Backbone, Item, ActivityView, messageTemplate){
	var Activity = Item.extend({
		messageTemplate : messageTemplate,
		contentView : ActivityView
	})		
	return Activity
})
