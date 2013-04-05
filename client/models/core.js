define([
	'models/user',
	'models/item',
	'models/items',	
	'models/post',
	'models/wall',
	'models/stream',
	'jquery',
	'bb'
], function(User, Item, Items, Post, Wall, Stream, $, Backbone){
	
	//defining Core as a global variable. This is important to make BackboneRelations functional
	Core = {
		User : User,
		Item : Item,
		Items : Items,
		Post : Post,
		Wall : Wall,
		Stream : Stream
	}
		
	//building an instance in order to setup relations	
	var post = new Core.Post()
	
	return Core
	
})
