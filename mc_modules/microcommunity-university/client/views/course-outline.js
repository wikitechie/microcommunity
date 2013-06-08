define([
	'bb',
	'text!templates/course-outline.html',
	'views/new-section-modal',
	'views/section'
], function(Backbone, html, NewSectionModal, SectionView){

	var CourseOutline = Backbone.Marionette.CompositeView.extend({
		template : html,
		itemView : SectionView,
		events : {
			'click .new-section' : 'newSection'
		},		
		appendHtml : function(collectionView, itemView, index){
			collectionView.$('.sections-region').append(itemView.el)
		},		
		newSection : function(){
			var newSection = new NewSectionModal({ model : this.model })			
			newSection.show()
		} 
	})
	
	return CourseOutline	
})
