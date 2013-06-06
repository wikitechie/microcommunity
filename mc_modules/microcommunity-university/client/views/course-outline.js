define([
	'bb',
	'text!templates/section.html',
	'text!templates/course-outline.html',
	'views/new-section-modal',
],function(Backbone, sectionHtml, courseOutlineHtml, NewSectionModal){	

	var SectionView = Backbone.Marionette.ItemView.extend({
		template : sectionHtml,
		onRender : function(){
			console.log(this.model.url())
		}				
	})

	var CourseOutline = Backbone.Marionette.CompositeView.extend({
		template : courseOutlineHtml,
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
