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

	/*server.data.material.sections = [
		{ title: 'first', description : 'blah blah blah' }, 
		{ title: 'second', description : 'blah blah blah' }
	]*/
	
	var material = Material.findOrCreate(server.data.material)
	
	App.courseOutline.show(new CourseOutlineView({ 
		collection : material.get('sections') ,
		model : material
	}))
	App.courseHeader.show(new CourseHeaderView())		


	App.materialSidebar.show(new MaterialSidebar(server.data.material))
		
	return App
	
})
