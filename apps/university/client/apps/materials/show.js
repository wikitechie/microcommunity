define([
	'app',
	'views/sidebars/basic',	
	'views/material-sidebar',
	'views/course-outline',
	'views/course-header',	
	'models/material',
	'modules/publisher',
	'modules/stream'
], function(App, BasicSidebar, MaterialSidebar, CourseOutlineView, CourseHeaderView, Material, publiserhModule, streamModule){
	
	App.addRegions({
		publisher : '#publisher-region',
		stream : '#stream-region',
		courseOutline : '#course-outline-region',
		courseHeader : '#course-header-region'	
	})
	
	App.addInitializer(function(){
		var material = Material.findOrCreate(server.data.material)
	
		App.courseOutline.show(new CourseOutlineView({ 
			collection : material.get('sections') ,
			model : material
		}))
		App.courseHeader.show(new CourseHeaderView({ model : material }))

	})
		
	return App
	
})
