define([
	'bb',
	'models/item',	
	'views/items/photo'		
], function(Backbone, Item, PhotoView){
	var Photo = Item.extend({	
		collection : 'photos',		
		contentView : PhotoView
	})	
	return Photo
})
