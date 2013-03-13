define([
	'newmodels/item',
], function(Item){

	PostItem = Item.extend({
		defaults : {
			content : "This is a post"
		}
	})
	
	return PostItem
})
