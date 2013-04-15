define([
	'bb',
	'models/item',
	'./view'
], function(Backbone, Item, PostView){

	var Post = Item.extend({	
		collection : 'posts',
		contentView : PostView
	})
	
	return Post

})
