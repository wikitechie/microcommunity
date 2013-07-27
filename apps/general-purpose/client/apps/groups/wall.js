define([
	'app',
	'models/group',	
	'modules/publisher',
	'modules/stream',
	'views/group-header',
	'views/publishers/post',
], function(App, Group, publiserhModule, streamModule, GroupHeader, PostPublisher){
	
	App.addRegions({
		publisher : '#publisher-region',
		stream : '#stream-region',	
		groupHeader : '#group-header-region'
	})
		
	App.addInitializer(function(){	
	
		var group = new Group(server.data.group)
		
		App.groupHeader.show(new GroupHeader({ model : group }))
		
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
