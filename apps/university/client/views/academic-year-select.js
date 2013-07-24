define([
	'bb',
], function(Backbone){	

	var YearOption = Backbone.Marionette.ItemView.extend({
		tagName : 'option',
		template : "<%= year - 1 %> - <%= year %>",
		onRender : function(){
			$(this.el).attr('value', this.model.get('year'))
		}	
	})
	
	var YearSelect = Backbone.Marionette.CompositeView.extend({
		initialize : function(options){
			if (options.disableNoYear){
				this.template = ""
			}
		},
		tagName : 'select',
		attributes : {
			name : 'academicYear'
		},
		itemView : YearOption,
		template : '<option></option>',
		onRender : function(){
			if (server.data.params && server.data.params.academicYear)
				var year = server.data.params.academicYear
			if (year)
				$(this.el).find('option[value='+year+']').attr('selected', true)
		}
	})

	return YearSelect	
	
})
