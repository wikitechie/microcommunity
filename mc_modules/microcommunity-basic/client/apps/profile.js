define([
	'models/index',
	'modules/publisher',
	'modules/stream'
], function(Models, publiserhModule, streamModule){

	var App = new Backbone.Marionette.Application()	
	
	App.currentUser = new Models.User(server.currentUser)

	App.addRegions({
		publisher : '#publisher-region',
		stream : '#stream-region'
	})
	
	if (App.currentUser.id){
		var profileUser = Models.User.findOrCreate(server.data.user)
		var options = {
			wall : profileUser.get('wall'),
			identifier : 'user-wall'
		}
		var Publisher = publiserhModule(App, options, function(view){
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

