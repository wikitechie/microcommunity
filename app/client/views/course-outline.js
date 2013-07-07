define([
	'bb',
	'text!templates/course-outline.html',
	'views/new-section-modal',
	'views/section'
], function(Backbone, html, NewSectionModal, SectionView){

	var SectionsListView = Backbone.Marionette.CompositeView.extend({
		template : '',
		itemView : SectionView, 
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
	
	var CourseOutline = Backbone.Marionette.Layout.extend({
		template : html,
		regions : {
			sections : '.sections-region',
			newSectionBtn : '.new-section-btn-region'
		},		
		onRender : function(){
			this.sections.show(new SectionsListView({ collection : this.collection }))
			if (App.isContainerAdmin())
				this.newSectionBtn.show(new NewSectionButton({ model : this.model }))
		}
	})
	
	return CourseOutline	
})
