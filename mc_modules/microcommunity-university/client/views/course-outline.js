define([
	'bb',
	'text!templates/course-outline.html'
],function(Backbone, html){	

	var CourseOutline = Backbone.Marionette.ItemView.extend({	
		template : html
	})		
	
	return CourseOutline	
})
