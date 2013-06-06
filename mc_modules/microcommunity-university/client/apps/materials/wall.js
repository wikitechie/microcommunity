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
		
	if (App.isLoggedIn()){
		var options = {
			wall : material.get('wall'),
			identifier : 'materials/'+ material.id
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
		wall : material.get('wall')
	}
		
	var Stream = streamModule(App, options, function(view){
		App.stream.show(view)
	})		
		
		
	return App
})
