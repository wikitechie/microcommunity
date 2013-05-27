define([
	'app',
	'views/sidebars/basic',	
	'views/material-sidebar',
	'models/semesters',	
	'models/semester',	
	'modules/publisher',
	'modules/stream'
], function(App, BasicSidebar, MaterialSidebar, Semesters, Semester, publiserhModule, streamModule){
	
	App.addRegions({
		materialSidebar : '#material-sidebar-region',
		semestersSidebar : '#semesters-sidebar-region',
		publisher : '#publisher-region',
		stream : '#stream-region'		
	})
		
	var semesters = new Semesters(server.data.semesters)
	var semestersLinks = []
	semesters.forEach(function(semester){
		semestersLinks.push({ label : semester.get('name'), url : semester.link() })
	})
		
	App.semestersSidebar.show(new BasicSidebar({
		header : 'Archive of Semesters',
		links : semestersLinks
	}))
	
	App.materialSidebar.show(new MaterialSidebar(server.data.material))
	
	var semester = Semester.findOrCreate(server.data.semester)
		
	if (App.isLoggedIn()){
		var options = {
			wall : semester.get('wall'),
			identifier : 'semester-wall'
		}
		
		var Publisher = publiserhModule(App, options, function(view){
			App.publisher.show(view)
		})
		
		App.vent.on('publisher:newitem', function(item){				
			Stream.add(item) 
		})		
	}
	
	var options = { 
		items : server.data.items, 
		type : 'wall',
		wall : semester.get('wall')
	}
		
	var Stream = streamModule(App, options, function(view){
		App.stream.show(view)
	})		
		
		
	return App
})
