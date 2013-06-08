define([
	'bb',
	'text!templates/section.html',
	'views/attachements',
	'views/new-attachement-modal',		
], function(Backbone, html, AttachementListView, NewAttachementModal){

	var SectionView = Backbone.Marionette.Layout.extend({
		template : html,
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
	
	return SectionView	
})
