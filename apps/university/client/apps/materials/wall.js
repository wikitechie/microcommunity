define([
	'app',
	'views/sidebars/basic',	
	'views/material-sidebar',
	'views/course-header',		
	'models/material',	
	'modules/publisher',
	'modules/stream',
	'views/publishers/post',
	'views/publishers/question',
	'views/membership-requests',
	'models/request'
], function(App, BasicSidebar, MaterialSidebar, CourseHeaderView, Material, publiserhModule, streamModule, PostPublisher, QuestionPublisher, MembershipRequests, Request){
	
	
	App.addRegions({
		publisher : '#publisher-region',
		stream : '#stream-region',
		courseHeader : '#course-header-region',
		requests : '#requests-region'			
	})
		
	App.addInitializer(function(){

		var material = new Material(server.data.material)
		App.courseHeader.show(new CourseHeaderView({ model : material }))			
		
		if (material.get('wall').can('publish')){
			var options = {
				wall : material.get('wall'),
				publishers : [PostPublisher, QuestionPublisher]
			}		
			var Publisher = publiserhModule(App, App.publisher, options)		
		}
	
		/*var options = { 
			items : server.data.items, 
			type : 'wall',
			wall : material.get('wall')
		}		*/
		
		material.get('wall').set('items', server.data.items)
		var Stream = streamModule(App, App.stream, material.get('wall'))			
		
	})
		
	return App
})
