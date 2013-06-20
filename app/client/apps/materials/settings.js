define([
	'app',
	'views/sidebars/basic',	
	'views/material-sidebar',
	'views/course-header',
	'models/material',
	'models/users',
	'views/members'
], function(App, BasicSidebar, MaterialSidebar, CourseHeaderView, Material, Users, MembersView){
	
	App.addRegions({
		courseHeader : '#course-header-region'
	})

	App.addInitializer(function(){
		var material = Material.findOrCreate(server.data.material)
		App.courseHeader.show(new CourseHeaderView({ model : material }))		
	})
	
	return App
})
