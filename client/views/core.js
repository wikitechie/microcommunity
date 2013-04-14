define([
	'bb',
	'models/item',
	'views/item',
	'views/items',
	'views/publisher',
	'bootstrap'	
], function(Backbone, Item, ItemView, ItemsView, PublisherView){
	
	return {
		ItemView : ItemView,
		ItemsView : ItemsView,
		PublisherView : PublisherView
	}
	
})
