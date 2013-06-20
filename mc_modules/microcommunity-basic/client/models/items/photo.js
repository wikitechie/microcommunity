define([
	'bb',
	'models/item',	
	'views/items/photo',
	'text!templates/items/post/message.html'	
], function(Backbone, Item, PhotoView, messageTemplate){
	var Photo = Item.extend({	
		collection : 'photos',		
		contentView : PhotoView,
		messageTemplate : messageTemplate
	})	
	return Photo
})
