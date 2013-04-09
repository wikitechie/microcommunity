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
			MyApp.layout.items.show(new Views.ItemsView({	collection : this.stream.get('items') }))		
		}		
	})	
		
	MyApp.addRegions({
		mainRegion : '#social-stream'
	})
	
	MyApp.addInitializer(function(options){	
		MyApp.currentUser = new Core.User(server.current_user)	
		MyApp.stream = new Core.Stream(options.wall)				
		MyApp.initializeLayout()		
	})	

	return MyApp
	
})

