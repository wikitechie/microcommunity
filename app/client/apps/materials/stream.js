define([
	'app',
	'views/sidebars/basic',	
	'views/material-sidebar',
	'views/course-header',
	'models/material',	
	'modules/publisher',
	'modules/stream',
	'models/stream',
], function(App, BasicSidebar, MaterialSidebar, CourseHeaderView, Material, publiserhModule, streamModule, Stream){

	console.log(Stream)
	
	App.addRegions({
		publisher : '#publisher-region',
		stream : '#stream-region',
		courseHeader : '#course-header-region'		
	})	
	
	App.addInitializer(function(){
	
		var material = Material.findOrCreate(server.data.material)
				
		App.courseHeader.show(new CourseHeaderView({ model : material }))
		
		var stream = new Core.Stream({ _id : material.get('stream'), items : server.data.items })
				
		var Stream = streamModule(App, App.stream, stream)				
		
			
	})		
		
	return App
})
