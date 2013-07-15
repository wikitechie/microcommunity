define([
	'app',
	'models/index',
	'modules/publisher',
	'modules/stream',
	'views/publishers/post'	
], function(App, Models, publiserhModule, streamModule, PostPublisher){

	function canPostOnWall(wall){	
		if (!App.isLoggedIn()) { return false }
		
		else {		
			if ( wall.get('owner').$id === App.currentUser.id ) {
				return true
			} else {
				return false			
			}		
		}
	}

	App.addRegions({
		publisher : '#publisher-region',
		stream : '#stream-region'
	})
	
	//if (App.isLoggedIn()){	
	var profileUser = Models.User.findOrCreate(server.data.user)	
	
	if (App.isLoggedIn())	
	if (profileUser.get('wall').can('publish')){
		var options = {
			wall : profileUser.get('wall'),
			identifier : 'user-wall',
			publishers : [PostPublisher]			
		}		
		var Publisher = publiserhModule(App, App.publisher, options)		
	}

	profileUser.get('wall').set('items', server.data.items)
	var Stream = streamModule(App, App.stream, profileUser.get('wall'))		
		
	return App
	
});

