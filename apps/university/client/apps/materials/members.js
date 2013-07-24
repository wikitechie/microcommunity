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
		publisher : '#publisher-region',
		stream : '#stream-region',
		courseHeader : '#course-header-region',
		membersRegion : '#members-region'
	})
	
	App.addInitializer(function(){
		var material = Material.findOrCreate(server.data.material)
		App.courseHeader.show(new CourseHeaderView({ model : material }))		
		App.membersRegion.show(new MembersView({ collection : material.get('members') }))	
	})
		
	return App
	
})
