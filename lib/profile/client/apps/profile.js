define([
	'models/core',
	'modules/publisher',
	'modules/stream'
], function(Core, publiserhModule, streamModule){

	var App = new Backbone.Marionette.Application()	
	
	App.currentUser = new Core.User(server.currentUser)

	App.addRegions({
		publisher : '#publisher-region',
		stream : '#stream-region'
	})
	
	if (App.currentUser.id){
		var profileUser = Core.User.findOrCreate(server.data.user)
		var Publisher = publiserhModule(App, profileUser.get('wall'), function(view){
			App.publisher.show(view)
		})
		
		App.vent.on('publisher:newitem', function(item){
			Stream.add(item) 
		})		
	}
		
	var Stream = streamModule(App, { items : server.data.items, type : 'wall' }, function(view){
		App.stream.show(view)
	})
		
	return App
	
});

