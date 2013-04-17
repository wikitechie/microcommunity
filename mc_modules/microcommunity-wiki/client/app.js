define([
	'bb',
	'models/index'	
], function(Backbone, Models){

	var App = Backbone.Marionette.Application.extend({
		setup : function(server){
			if (server.currentUser){
				this.currentUser = new Models.User(server.currentUser)
			}			
		}	
	})
	
	return App
})
