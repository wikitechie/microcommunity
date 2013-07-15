define([
	'app',
	'models/index',
	'modules/publisher',
	'modules/stream',
	'models/materials',
	'views/publishers/post',
	'views/publishers/photo',
	'models/stream'
], function(App, Models, publiserhModule, streamModule, Materials, PostPublisher, PhotoPublisher, Stream){

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
	
	var globalStream = new Stream({ _id : 'global', items : server.data.items })
		
	var Stream = streamModule(App, App.stream, globalStream)		
		
	return App
	
});

