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
		className : 'well',
		template : html,
		events : {
			'click .pin-btn' : 'setHighlighted'
		},
		setHighlighted : function(){
			this.options.highlighted.save({
				'section' : this.model.id
			},{
				success : function(){ console.log('success') },
				error : function(){ console.log('error') },
				wait : true
			})
		},
		hightlightView : function(){
			$(this.el).css('background-color','rgb(252, 248, 227)')
		},
		regions : {
			attachements : "#attachement-list-region",
			sectionToolbar : '#section-toolbar-region'
		},
		onRender : function(){
			this.attachements.show(new AttachementListView({ collection : this.model.get('attachements') }))
			if (App.isContainerAdmin())
				this.sectionToolbar.show(new SectionToolbarView({ model : this.model }))	
			if (this.options.highlighted.get('section') == this.model.id)	
				this.hightlightView()				
		}				
	})
	
	return SectionView	
})
