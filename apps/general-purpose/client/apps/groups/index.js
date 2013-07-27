define([
	'app',
	'views/group-list',
	'views/new-group-button',
	'models/group'	
	
], function(App, GroupListView, NewGroupButton, Group){

	App.addRegions({
		groupsList : '#groups-list-region',
		newGroupButton : '#new-group-button-region'
	})	
	
	App.addInitializer(function(){
	
		var groups = new Backbone.Collection(server.data.groups, { model : Group })
	
		App.groupsList.show(new GroupListView({ collection : groups}))
		
		if (App.isLoggedIn())		
			App.newGroupButton.show(new NewGroupButton())
		
	})

	return App
	
})

