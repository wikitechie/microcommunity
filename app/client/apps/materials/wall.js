define([
	'app',
	'views/sidebars/basic',	
	'views/material-sidebar',
	'views/course-header',		
	'models/material',	
	'modules/publisher',
	'modules/stream',
	'views/publishers/post',
	'views/publishers/question'
], function(App, BasicSidebar, MaterialSidebar, CourseHeaderView, Material, publiserhModule, streamModule, PostPublisher, QuestionPublisher){
	
	
	App.addRegions({
		publisher : '#publisher-region',
		stream : '#stream-region',
		courseHeader : '#course-header-region'				
	})
		
	App.addInitializer(function(){

		var material = new Material(server.data.material)
		App.courseHeader.show(new CourseHeaderView({ model : material }))			
		
		if (material.get('wall').get('canPublish')){
			var options = {
				wall : material.get('wall'),
				publishers : [PostPublisher, QuestionPublisher]
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
