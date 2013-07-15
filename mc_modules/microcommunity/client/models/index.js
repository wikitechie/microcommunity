define([
	'models/user',
	'models/item',
	'models/items',
	'models/items-index',
	'models/wall',
	'models/stream',
	'jquery',
	'bb'
], function(User, Item, Items, ItemsIndex, Wall, Stream, $, Backbone){
	
	//defining Core as a global variable. This is important to make BackboneRelations functional
	
	_.extend(Item, ItemsIndex)
		
	Core = {
		User : User,
		Item : Item,
		Items : Items,
		Wall : Wall,
		Stream : Stream
	}
	
	return Core
	
})
