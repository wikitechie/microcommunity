define([
	'bb',
	'models/semester'
],function(Backbone, Semester){

	var Semesters = Backbone.Collection.extend({
		model : Semester			
	})	
	return Semesters
	
})
