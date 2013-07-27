define([
	'app',
	'models/group',	
	'modules/publisher',
	'modules/stream',
	'views/publishers/post',

], function(App, Group, publiserhModule, streamModule, PostPublisher){
	
	App.addRegions({
		publisher : '#publisher-region',
		stream : '#stream-region',	
	})
		
	App.addInitializer(function(){	
	
		var group = new Group(server.data.group)
		
		if (group.get('wall').can('publish')){
			var options = {
				wall : group.get('wall'),
				publishers : [PostPublisher]
			}		
			var Publisher = publiserhModule(App, App.publisher, options)		
		}
	
		group.get('wall').set('items', server.data.items)
		var Stream = streamModule(App, App.stream, group.get('wall'))			
		
	})
		
	return App
})
