define([
	'bb',
	'text!templates/browse-materials-form.html'
], function(Backbone, html){	


	var YearOption = Backbone.Marionette.ItemView.extend({
		tagName : 'option',
		template : "<%= year - 1 %> - <%= year %>",
		onRender : function(){
			$(this.el).attr('value', this.model.get('year'))
		}	
	})
	
	var YearSelect = Backbone.Marionette.CompositeView.extend({
		tagName : 'select',
		attributes : {
			name : 'academicYear'
		},
		itemView : YearOption,
		template : ''
	})
	
	var BrowseMaterialsForm = Backbone.Marionette.Layout.extend({	
		template : html,
		regions : {
			academicYearSelect : '#academic-year-select-region'
		},
		onRender : function(){
			var years = new Backbone.Collection([ {year:2011}, {year:2012}, {year:2013} ])
			this.academicYearSelect.show(new YearSelect({ collection : years }))
		}		
	})		
	return BrowseMaterialsForm	
})
