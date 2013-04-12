define([
	'models/user',
	'models/item',
	'models/items',	
	'models/post',
	'models/photo',
	'models/wall',
	'jquery',
	'bb'
], function(User, Item, Items, Post, Photo, Wall, $, Backbone){
	
	//defining Core as a global variable. This is important to make BackboneRelations functional
	Core = {
		User : User,
		Item : Item,
		Items : Items,
		Post : Post,
		Photo : Photo,
		Wall : Wall
	}
		
	//building an instance in order to setup relations	
	var post = new Core.Post()
	var photo = new Core.Photo()
	
	return Core
	
})
