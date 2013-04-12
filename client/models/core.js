define([
	'models/user',
	'models/item',
	'models/items',	
	'modules/post/model',
	'modules/photo/model',
	'models/wall',
	'jquery',
	'bb'
], function(User, Item, Items, Post, Photo, Wall, $, Backbone){
	
	//defining Core as a global variable. This is important to make BackboneRelations functional
	
	_.extend(Item, {
		Post : Post,
		Photo : Photo,	
	})
	
	Core = {
		User : User,
		Item : Item,
		Items : Items,
		Wall : Wall
	}
		
	//building an instance in order to setup relations	
	var post = new Core.Item.Post()
	var photo = new Core.Item.Photo()
	
	return Core
	
})
