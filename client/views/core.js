define([
	'bb',
	'models/item',
	'views/item',
	'views/items',
	'views/publisher',
	'views/layout',
	'bootstrap'	
], function(Backbone, Item, ItemView, ItemsView, PublisherView, Layout){
	
	return {
		ItemView : ItemView,
		ItemsView : ItemsView,
		PublisherView : PublisherView,
		Layout : Layout	
	}
	
})
