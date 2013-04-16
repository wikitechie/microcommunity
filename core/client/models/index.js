define([
	'models/user',
	'models/item',
	'models/items',
	'models/items-index',
	'models/wall',
	'jquery',
	'bb'
], function(User, Item, Items, ItemsIndex, Wall, $, Backbone){
	
	//defining Core as a global variable. This is important to make BackboneRelations functional
	
	_.extend(Item, ItemsIndex)
		
	Core = {
		User : User,
		Item : Item,
		Items : Items,
		Wall : Wall
	}
	
	return Core
	
})
