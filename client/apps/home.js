define([
	'models/core',
	'views/core'
], function(Core, Views){

	var App = new Backbone.Marionette.Application()	
		
	App.addRegions({
		mainRegion : '#social-stream'
	})
	
	//login	
	App.addInitializer(function(server){
		if (server.currentUser){
			App.currentUser = new Core.User(server.currentUser)
		}	
	})	
	
	//stream 
	App.addInitializer(function(server){
	
		App.mainStream = new Views.ItemsLayout()
		App.mainRegion.show(App.mainStream)
		
		//creating and showing publisher	
		if (App.currentUser){
			var publisher = new Views.PublisherView({
				wall : new Core.Wall(server.data.wall)
			})
			App.mainStream.publisher.show(publisher)			
		}
		
		//creating and showing publisher		
		App.stream = new Core.Wall(server.data.stream)
		var items = new Views.ItemsView({	
			collection : App.stream.get('items') 
		})			
		App.mainStream.items.show(items)

		//connecting publisher and stream		
		App.on('publisher:post:new', function(post){
			App.stream.get('items').create(post, {
				success : function(model){
					App.trigger('publisher:release')
				}, 
				error : function(model, xhr, options){
					console.log('error')
					console.log(model.toJSON())
				},
				wait : true, at : 0 
			})		
		})			
	})	

	return App
	
});

