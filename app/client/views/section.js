define([
	'bb',
	'text!templates/section.html',
	'views/attachements',
	'views/new-attachement-modal',		
], function(Backbone, html, AttachementListView, NewAttachementModal){

	var SectionView = Backbone.Marionette.Layout.extend({
		initialize : function(){
			this.highlight = false
		},
		className : 'well',
		template : html,
		events : {
			'mouseover' : 'displayControls',
			'click .add-attachement-btn' : 'addAttachement',
			'click .pin-btn' : 'setHighlighted'
		},
		displayControls : function(){
			console.log('displaying controls')
		},
		setHighlighted : function(){
			if (!this.highlight){
				$(this.el).css('background-color','rgb(252, 248, 227)')
				this.highlight = true
			} else {
				$(this.el).css('background-color','')
				this.highlight = false
			}
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
