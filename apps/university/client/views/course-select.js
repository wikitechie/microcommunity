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
		initialize : function(options){
			if (options.defaultYear)
				this.template = ''
		},
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
		initialize : function(options){
			if (options.defaultYear)
				this.template = ''
				
		},
		tagName : 'select',
		attributes : {
			name : 'course'
		},
		itemView : Option,
		template : '<option></option>',
		appendHtml : function(collectionView, itemView, index){
			if (!this.options.year.get('value')){
				$(collectionView.el).append(itemView.el)								
			} else if (itemView.model.get('year') == this.options.year.get('value') ) {
				$(collectionView.el).append(itemView.el)					
			}		
		},
		onRender : function(){
			if (server.data.params && server.data.params.course){	
				var value = server.data.params.course
				$(this.el).find("option[value="+value+"]").attr('selected', true)						
				server.data.params.course = null
			}		

		}				 		
	})
	
	var CourseSelector = Backbone.Marionette.Layout.extend({	
		initialize : function(options){		
			this.year = new Backbone.Model({ value : options.defaultYear })
			if (server.data.params && server.data.params.year) this.year.set('value', server.data.params.year)
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
			this.courseSelect.show(new Select({ 
				year : this.year, 
				collection : this.collection,
				defaultYear : this.options.defaultYear
			}))
			var years = new Backbone.Collection([
				{ year : 1 , displayName : 'First' },
				{ year : 2 , displayName : 'Second' },
				{ year : 3 , displayName : 'Third' },
				{ year : 4 , displayName : 'Fourth' },
				{ year : 5 , displayName : 'Fifth' }
			])
			this.yearSelect.show(new YearSelect({ 
				collection : years, 
				year : this.year,  
				defaultYear : this.options.defaultYear
			}))
		}		
	})		
	
	return CourseSelector
		
})
