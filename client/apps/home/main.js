define([
	'models/core',
	'views/core'
], function(Core, Views){

	var MyApp = new Backbone.Marionette.Application({
		isLoggedIn : function(){
			if (typeof this.currentUser.id != 'undefined') {
				return true
			}
			else return false
		},
		initializeLayout : function(){

			MyApp.layout = new Views.Layout()	

			MyApp.mainRegion.show(this.layout)	

			if (this.isLoggedIn()){
				MyApp.layout.publisher.show(new Views.PublisherView())
			}			
			MyApp.layout.items.show(new Views.ItemsView({	collection : this.wall.get('items') }))		
		}		
	})	
		
	MyApp.addRegions({
		mainRegion : '#social-stream'
	})
	
	MyApp.addInitializer(function(options){
		MyApp.currentUser = new Core.User(server.current_user)	
		MyApp.wall = new Core.Wall(options.wall)
		MyApp.initializeLayout()	
	})	

	return MyApp
	
});

