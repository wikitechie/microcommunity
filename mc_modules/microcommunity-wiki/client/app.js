define([
	'bb',
	'models/index',
	'views/sidebars/basic',	
], function(Backbone, Models, basicSidebar){

	var MCApp = Backbone.Marionette.Application.extend({
		setup : function(){
			this.currentUser = Models.User.findOrCreate(server.currentUser)
		},
		
		isLoggedIn : function(){
			if (this.currentUser) return true
			else return false
		}
			
	})
	
	var App = new MCApp()
	App.setup()
	
	App.addRegions({
		mainSidebar : '#main-sidebar-region'
	})	

	App.addInitializer(function(){
		App.mainSidebar.show(new basicSidebar({
			header : 'Navigation',
			links : [ 
				{label : 'Main', url : '/' },
				{label : 'Materials', url : '/materials' },
			]
		}))	
	})	
	
	
	return App
})
