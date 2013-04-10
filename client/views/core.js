define([
	'bb',
	'models/item',
	'views/item',
	'views/items',
	'views/publisher',
	'views/layouts/items',
	'bootstrap'	
], function(Backbone, Item, ItemView, ItemsView, PublisherView, ItemsLayout){
	
	return {
		ItemView : ItemView,
		ItemsView : ItemsView,
		PublisherView : PublisherView,
		ItemsLayout : ItemsLayout	
	}
	
})
