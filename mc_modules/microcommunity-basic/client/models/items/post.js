define([
	'bb',
	'models/item',
	'views/items/post',
	'text!templates/items/post/message.html'
], function(Backbone, Item, PostView, messageTemplate){

	var Post = Item.extend({	
		collection : 'posts',
		contentView : PostView,
		messageTemplate : messageTemplate
	})
	
	return Post

})
