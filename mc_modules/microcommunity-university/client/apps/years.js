define([
	'app',
	'views/thumbnails'
], function(App, Thumbnails){

	App.addRegions({
		years : '#years-region'
	})

	var years = new Backbone.Collection([
		{ name : 'First Year', link : '/years/efd', photo : '/academic-hat.jpg'}, 
		{ name : 'Second Year', link : '/years/efd', photo : '/academic-hat.jpg'},
		{ name : 'Third Year', link : '/years/efd', photo : '/academic-hat.jpg'}		
	])		
	
	App.years.show(new Thumbnails({ collection : years }))
	
	return App
	
})
