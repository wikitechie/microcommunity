define([
	'app',
	'views/thumbnails',
	'views/new-material-form',
	'models/materials'
], function(App, Thumbnails, NewMaterialForm, Materials){

	App.addRegions({
		materials : '#materials-region',
		newMaterialForm : '#new-material-form-region'
	})

	var materials = new Materials(server.data.materials)	
	
	App.newMaterialForm.show(new NewMaterialForm())
	App.materials.show(new Thumbnails({ collection : materials }))
	
	return App
	
})
