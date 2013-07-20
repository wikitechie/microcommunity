define([
	'bb',
	'models/item',	
	'views/items/photo',
	'views/item-plugins/comments',	
	'text!templates/items/post/message.html'	
], function(Backbone, Item, PhotoView, Comments, messageTemplate){
	var Photo = Item.extend({	
		collection : 'photos',		
		contentView : PhotoView,
		messageTemplate : messageTemplate,
		pluginView : Comments		
	})	
	return Photo
})
