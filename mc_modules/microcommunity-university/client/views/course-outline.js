define([
	'bb',
	'text!templates/section.html',
	'text!templates/course-outline.html',
	'text!templates/attachement.html',	
	'text!templates/attachement-list.html',		
	'views/new-section-modal',
	'views/new-attachement-modal'	
],function(Backbone, sectionHtml, courseOutlineHtml, attachementHtml, attachementListHtml, NewSectionModal, NewAttachementModal){	


	var AttachementView = Backbone.Marionette.ItemView.extend({
		template : attachementHtml
	})
	
	var AttachementListView = Backbone.Marionette.CompositeView.extend({
		template : attachementListHtml,
		itemView : AttachementView,
		appendHtml : function(collectionView, itemView, index){
			collectionView.$('ul').append(itemView.el)
		}
	})

	var SectionView = Backbone.Marionette.Layout.extend({
		template : sectionHtml,
		events : {
			'click .add-attachement-btn' : 'addAttachement'
		},
		addAttachement : function(){
			var newAttachement = new NewAttachementModal()
			newAttachement.show()
		},
		regions : {
			attachements : "#attachement-list-region"
		},
		onRender : function(){
			var collection = new Backbone.Collection([
				{ id : 1 },
				{ id : 2 }
			])		
			this.attachements.show(new AttachementListView({ collection : collection }))		
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
