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
		materialSidebar : '#material-sidebar-region',
		publisher : '#publisher-region',
		stream : '#stream-region',
		courseOutline : '#course-outline-region',
		courseHeader : '#course-header-region'	
	})
	
	App.courseOutline.show(new CourseOutlineView())	
	App.courseHeader.show(new CourseHeaderView())		

	var material = Material.findOrCreate(server.data.material)
	
	App.materialSidebar.show(new MaterialSidebar(server.data.material))
		
	return App
	
})
