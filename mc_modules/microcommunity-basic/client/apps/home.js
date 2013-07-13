define([
	'app',
	'models/index',
	'modules/publisher',
	'modules/stream',
	'models/materials',
	'views/publishers/post',
	'views/publishers/photo'	
], function(App, Models, publiserhModule, streamModule, Materials, PostPublisher, PhotoPublisher){

	App.addRegions({
		publisher : '#publisher-region',
		stream : '#stream-region'
	})
	
	if (App.isLoggedIn())	
	if (App.currentUser.get('wall').can('publish')){	
		var options = {
			wall : App.currentUser.get('wall'),
			publishers : [PostPublisher, PhotoPublisher]
		}		
		var Publisher = publiserhModule(App, App.publisher, options)		
	}

	var options = { items : server.data.items, type : 'stream' }	
	var Stream = streamModule(App, App.stream, options)		
		
	return App
	
});

