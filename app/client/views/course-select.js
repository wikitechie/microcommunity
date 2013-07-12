define([
	'bb',
	'text!templates/course-select.html'
], function(Backbone, html){	
	
	var YearOption = Backbone.Marionette.ItemView.extend({
		tagName : 'option',
		template : "<%= displayName %>",
		onRender : function(){
			$(this.el).attr('value', this.model.get('year'))
		},
	})
	
	var YearSelect = Backbone.Marionette.CompositeView.extend({
		tagName : 'select',
		events : {
			'click' : 'selected'
		},		
		attributes : {
			name : 'year'
		},		
		itemView : YearOption,
		template : '<option></option>',
		selected : function(){
			var yearValue = $(this.el).find(':selected').attr('value')
			this.options.year.set('value', yearValue)
		},
		onRender : function(){
			var value = this.options.year.get('value')
			$(this.el).find("option[value="+value+"]").attr('selected', true)
		},
	})
	
	var Option = Backbone.Marionette.ItemView.extend({
		tagName : 'option',
		template : "<%= title %>",
		onRender : function(){
			$(this.el).attr('value', this.model.id)
		}	
	})
	
	var Select = Backbone.Marionette.CompositeView.extend({
		tagName : 'select',
		attributes : {
			name : 'course'
		},
		itemView : Option,
		template : '<option></option>',
		appendHtml : function(collectionView, itemView, index){
			console.log(this.options.year.get('value'))
			if (itemView.model.get('year') == this.options.year.get('value') ) {
				$(collectionView.el).append(itemView.el)					
			}		
		}				 		
	})
	
	var CourseSelector = Backbone.Marionette.Layout.extend({	
		initialize : function(){		
			this.year = new Backbone.Model()
			var self = this
			this.year.on('change:value', function(){
				self.render()
			})
		},
		template : html,
		regions : {
			courseSelect : '.course-select-region',
			yearSelect : '.year-select-region'
		},
		onRender : function(){		
			this.courseSelect.show(new Select({ year : this.year, collection : this.collection }))
			var years = new Backbone.Collection([
				{ year : 1 , displayName : 'First' },
				{ year : 2 , displayName : 'Second' },
				{ year : 3 , displayName : 'Third' },
				{ year : 4 , displayName : 'Fourth' },
				{ year : 5 , displayName : 'Fifth' }
			])
			this.yearSelect.show(new YearSelect({ collection : years, year : this.year }))
		}		
	})		
	
	return CourseSelector
		
})
