define([
	'bb',
	'views/item',
	'views/items',
	'views/publisher',
	'bootstrap'	
], function(Backbone, ItemView, ItemsView, PublisherView){
	
	return {
		ItemView : ItemView,
		ItemsView : ItemsView,
		PublisherView : PublisherView
	}
	
})
