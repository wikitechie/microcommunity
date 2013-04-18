define([
	'bb',
	'models/item',
	'views/items/activity'
], function(Backbone, Item, ActivityView){

	var Activity = Item.extend({	
		collection : 'activities',
		contentView : ActivityView
	})
	
	return Activity

})
