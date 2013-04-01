define([
	'models/core',
	'views/core'
], function(Core, Views){
	
	var MyApp = new Backbone.Marionette.Application({
		initializeLayout : function(){
			MyApp.layout = new Views.Layout()	
			MyApp.mainRegion.show(this.layout)	
			MyApp.layout.publisher.show(new Views.PublisherView())
			MyApp.layout.items.show(new Views.ItemsView({	collection : this.wall.get('items') }))		
		}		
	})
		
	MyApp.addRegions({
		mainRegion : '#social-stream'
	})
	
	MyApp.addInitializer(function(options){
		MyApp.user = new Core.User(options.user)	
		MyApp.wall = new Core.Wall(options.wall)	
		
		MyApp.vent.on('post:new', function(post){
			console.log(post)		
			//MyApp.wall.get('items').create(post)
		})				
		MyApp.initializeLayout()		
	})	

	return MyApp
	
});

