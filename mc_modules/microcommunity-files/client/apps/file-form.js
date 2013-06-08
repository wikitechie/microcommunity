define([
	'app',
	'views/material-sidebar'
], function(App, MaterialSidebar){

	App.addRegions({
		materialSidebar : '#material-sidebar-region',	
	})
	
	App.addInitializer(function(){
		App.materialSidebar.show(new MaterialSidebar(server.data.material))		
	})
		
	return App
	
})
