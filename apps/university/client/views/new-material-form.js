define([
	'bb',
	'text!templates/new-material-form.html',
	'views/course-select',
	'views/academic-year-select'
], function(Backbone, html, CourseSelect, YearSelect){	

	var NewMaterialForm = Backbone.Marionette.Layout.extend({	
		template : html,
		regions : {
			courseSelect : '.course-select-region',
			academicYearSelect : '.academic-year-select-region'
		},
		onRender : function(){
			this.courseSelect.show(new CourseSelect({ collection : this.options.courses, defaultYear : 1 }))
			var years = new Backbone.Collection([ {year:2013}, {year:2012}, {year:2011} ])			
			this.academicYearSelect.show(new YearSelect({ collection : years, disableNoYear : true }))
		}
	})		
	return NewMaterialForm	
})
