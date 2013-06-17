define([
	'app',
	'models/index',
	'views/sidebars/basic',
	'views/new-material-form'
], function(App, Models, basicSidebar, MaterialForm){

	App.addRegions({
		mainSidebar : '#main-sidebar-region',
		materialForm : '#material-form-region',
	})
		
	App.materialForm.show(new MaterialForm())	
		
	return App
	
});

