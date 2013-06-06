define([
	'bb',
	'text!templates/course-header.html'
],function(Backbone, html){	

	var CourseHeader = Backbone.Marionette.ItemView.extend({	
		template : html
	})		
	
	return CourseHeader	
})
