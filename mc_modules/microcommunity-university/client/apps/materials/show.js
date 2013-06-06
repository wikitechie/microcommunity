define([
	'app',
	'views/sidebars/basic',	
	'views/material-sidebar',
	'views/course-outline',
	'models/semesters',		
	'models/material',
	'modules/publisher',
	'modules/stream'
], function(App, BasicSidebar, MaterialSidebar, CourseOutlineView, Semesters, Material, publiserhModule, streamModule){
	
	App.addRegions({
		materialSidebar : '#material-sidebar-region',
		semestersSidebar : '#semesters-sidebar-region',
		publisher : '#publisher-region',
		stream : '#stream-region',
		courseOutline : '#course-outline-region'		
	})
	
	App.courseOutline.show(new CourseOutlineView())
		
	var semesters = new Semesters(server.data.semesters)
	var semestersLinks = []
	semesters.forEach(function(semester){
		semestersLinks.push({ label : semester.get('name'), url : semester.link() })
	})
	
	var material = Material.findOrCreate(server.data.material)	
	
	semestersLinks.push({ label : 'New semester', url : material.link() + '/semesters/new'})
		
	App.semestersSidebar.show(
		new BasicSidebar({
			header : 'Archive of Semesters',
			links : semestersLinks
		})
	)
	
	App.materialSidebar.show(new MaterialSidebar(server.data.material))
		
	return App
	
})
