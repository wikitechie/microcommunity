define([
	'bb',
	'text!templates/section.html',
	'text!templates/course-outline.html',
	'text!templates/attachement.html',	
	'text!templates/attachement-list.html',		
	'views/new-section-modal',
	'views/new-attachement-modal',
	'models/wikipage'
], function(Backbone, sectionHtml, courseOutlineHtml, attachementHtml, attachementListHtml, NewSectionModal, NewAttachementModal, Wikipage){

	var AttachementView = Backbone.Marionette.ItemView.extend({
		template : attachementHtml,	
		serializeData : function(){
			var link
			switch(this.model.get('object').$ref){
				case "wikipages":
					var wikipage = Wikipage.findOrCreate({ _id : this.model.get('object').$id })
					link = wikipage.link()							
				break;
			}		
		
			return _.extend(this.model.toJSON(), {
				link : link,
				thumbnail : {},
			})
		}
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
			var newAttachement = new NewAttachementModal({ model : this.model })
			newAttachement.show()
		},
		regions : {
			attachements : "#attachement-list-region"
		},
		onRender : function(){
			this.attachements.show(new AttachementListView({ collection : this.model.get('attachements') }))		
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
