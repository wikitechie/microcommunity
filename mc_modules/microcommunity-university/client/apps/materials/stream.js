define([
	'app',
	'views/sidebars/basic',	
	'views/material-sidebar',
	'views/course-header',
	'models/material',	
	'modules/publisher',
	'modules/stream'
], function(App, BasicSidebar, MaterialSidebar, CourseHeaderView, Material, publiserhModule, streamModule){
	
	App.addRegions({
		materialSidebar : '#material-sidebar-region',
		publisher : '#publisher-region',
		stream : '#stream-region',
		courseHeader : '#course-header-region'		
	})
	
	App.materialSidebar.show(new MaterialSidebar(server.data.material))
	App.courseHeader.show(new CourseHeaderView())			
	
	var material = Material.findOrCreate(server.data.material)
	
	var options = { 
		items : server.data.items, 
		type : 'stream',
	}
		
	var Stream = streamModule(App, options, function(view){
		App.stream.show(view)
	})		
		
		
	return App
})
