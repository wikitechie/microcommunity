define([
	'bb',
	'models/item',
	'views/items/post',
	'views/item-plugins/comments',
	'text!templates/items/post/message.html'
], function(Backbone, Item, PostView, Comments, messageTemplate){

	var Post = Item.extend({	
		contentView : PostView,
		messageTemplate : messageTemplate,
		pluginView : Comments
	})
	
	return Post

})
