define([
	'bb',
	'text!templates/section.html',
	'text!templates/section-toolbar.html',	
	'views/attachements',
	'views/new-attachement-modal',		
], function(Backbone, html, sectionToolbarHtml, AttachementListView, NewAttachementModal){

	var SectionToolbarView = Backbone.Marionette.ItemView.extend({
		template : sectionToolbarHtml,
		events : {
			'click .add-attachement-btn' : 'addAttachement',		
		},
		addAttachement : function(){
			var newAttachement = new NewAttachementModal({ model : this.model })
			newAttachement.show()
		},		
	})

	var SectionView = Backbone.Marionette.Layout.extend({
		initialize : function(){
			this.highlight = false
		},
		className : 'well',
		template : html,
		events : {
			'mouseover' : 'displayControls',
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
		regions : {
			attachements : "#attachement-list-region",
			sectionToolbar : '#section-toolbar-region'
		},
		onRender : function(){
			this.attachements.show(new AttachementListView({ collection : this.model.get('attachements') }))
			if (App.isContainerAmin())
				this.sectionToolbar.show(new SectionToolbarView({ model : this.model }))								
		}				
	})
	
	return SectionView	
})
