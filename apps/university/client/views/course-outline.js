define([
	'bb',
	'text!templates/course-outline.html',
	'views/new-section-modal',
	'views/section'
], function(Backbone, html, NewSectionModal, SectionView){

	var SectionsListView = Backbone.Marionette.CompositeView.extend({
		template : '',
		itemView : SectionView, 
		itemViewOptions : function(){
			return {
				highlighted : this.options.highlighted
			}
		}
	})
	
	var NewSectionButton = Backbone.Marionette.ItemView.extend({
		template : "<i class='icon-plus'></i> New Section",
		tagName : 'a',
		className : "btn btn-large new-section",
		newSection : function(){
			var newSection = new NewSectionModal({ model : this.model })			
			newSection.show()
		},
		events : {
			'click' : 'newSection'
		}
	})	
	
	var Highlighted = Backbone.RelationalModel.extend({ 
		url : function(){
			return '/api/materials/'+this.get('material')+'/sections/'+this.get('section')+'/highlight'
		}
	})	
	
	var CourseOutline = Backbone.Marionette.Layout.extend({
		initialize : function(){
			this.highlighted = new Highlighted({ 
				section : this.model.get('highlighted'),
				material : this.model.id
			})
			this.highlighted.on('change', this.render)
		},
		template : html,
		regions : {
			sections : '.sections-region',
			newSectionBtn : '.new-section-btn-region'
		},		
		onRender : function(){
			this.sections.show(new SectionsListView({ 
				collection : this.collection, 
				highlighted : this.highlighted 
			}))
			if (App.isContainerAdmin())
				this.newSectionBtn.show(new NewSectionButton({ model : this.model }))
		}
	})
	
	return CourseOutline	
})
