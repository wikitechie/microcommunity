define([
	'app',
	'views/sidebars/basic',	
	'views/material-sidebar',
	'views/course-header',		
	'models/material',	
	'modules/publisher',
	'modules/stream',
	'views/publishers/post',
], function(App, BasicSidebar, MaterialSidebar, CourseHeaderView, Material, publiserhModule, streamModule, PostPublisher){
	
	App.addRegions({
		publisher : '#publisher-region',
		stream : '#stream-region',
		courseHeader : '#course-header-region'				
	})
		
	App.addInitializer(function(){

		var material = Material.findOrCreate(server.data.material)
		App.courseHeader.show(new CourseHeaderView({ model : material }))			
		
		if (App.isLoggedIn()){
			var options = {
				wall : material.get('wall'),
				identifier : 'materials/'+ material.id,
				publishers : [PostPublisher]
			}		
			var Publisher = publiserhModule(App, App.publisher, options)		
		}
	
		var options = { 
			items : server.data.items, 
			type : 'wall',
			wall : material.get('wall')
		}		
		var Stream = streamModule(App, App.stream, options)		
		
	})
		
	return App
})
