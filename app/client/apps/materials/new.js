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
		

	var formInfo = new Backbone.Model({
		currentSemester : server.data.currentSemester
	})
	App.materialForm.show(new MaterialForm({ model : formInfo }))	
		
	return App
	
});

