define([
	'models/core',
	'views/core'
], function(Core, Views){

	var MyApp = new Backbone.Marionette.Application({
		isLoggedIn : function(){
			if (this.currentUser) {
				return true
			}
			else {
				return false
			}
		},
		initializeLayout : function(){
		
			MyApp.layout = new Views.Layout()	
			MyApp.mainRegion.show(this.layout)
			if (this.isLoggedIn()){
				MyApp.layout.publisher.show(new Views.PublisherView())
			}			
			MyApp.layout.items.show(new Views.ItemsView({	collection : this.stream.get('items') }))		
		}		
	})	
		
	MyApp.addRegions({
		mainRegion : '#social-stream'
	})
	
	MyApp.addInitializer(function(options){
		if (server.current_user){
			MyApp.currentUser = new Core.User(server.current_user)
			MyApp.wall = new Core.Wall(options.wall)
		}		
		MyApp.stream = new Core.Wall(options.stream)
		MyApp.initializeLayout()
		MyApp.on('publisher:post:new', function(post){
			MyApp.stream.get('items').create(post, {
				success : function(model){
					MyApp.trigger('publisher:release')
				}, 
				error : function(model, xhr, options){
					console.log('error')
					console.log(model.toJSON())
				},
				wait : true, at : 0 
			})		
		})			
	})	

	return MyApp
	
});

