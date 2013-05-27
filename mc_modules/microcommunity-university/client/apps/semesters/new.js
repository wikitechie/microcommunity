define([
	'app',
	'views/sidebars/basic',	
	'views/material-sidebar',
	'views/new-semester-form',
	'models/semesters',		
	'models/material',
	'modules/publisher',
	'modules/stream'
], function(App, BasicSidebar, MaterialSidebar, SemesterForm, Semesters, Material, publiserhModule, streamModule){
	
	App.addRegions({
		materialSidebar : '#material-sidebar-region',
		semestersSidebar : '#semesters-sidebar-region',
		semesterForm : '#semester-form-region'
	})
		
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
	
	App.semesterForm.show(new SemesterForm({ model : material }))
		
	return App
	
})
