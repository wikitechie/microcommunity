define([
	'bb',
	'models/item',
	'views/items/post'
], function(Backbone, Item, PostView){

	var Post = Item.extend({	
		collection : 'posts',
		contentView : PostView
	})
	
	return Post

})
