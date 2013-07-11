define([
	'bb',
	'text!templates/new-material-form.html',
	'views/course-select'
], function(Backbone, html, CourseSelect){	

	var NewMaterialForm = Backbone.Marionette.Layout.extend({	
		template : html,
		regions : {
			courseSelect : '.course-select-region'
		},
		onRender : function(){
			this.courseSelect.show(new CourseSelect({ collection : this.options.courses }))
		}
	})		
	return NewMaterialForm	
})
