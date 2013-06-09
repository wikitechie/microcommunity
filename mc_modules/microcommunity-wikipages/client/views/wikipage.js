define([
	'bb',
	'text!templates/wikipage.html',
	'text!templates/wikipage-buttons.html',	
	'text!templates/wikipage-body.html',
	'text!templates/wikipage-edit.html'				
], function(Backbone, html, buttons, body, edit){

	var ButtonView = Backbone.Marionette.ItemView.extend({
		tagName : 'a',
		events : {
			'click' : 'click'
		},
		attributes : function(){
			var buttonClass = this.model.get('name') +'-button'
			var classes = 'btn ' + buttonClass
			return {
				class : classes
			}
		},
		click : function(){ 
			this.model.collection.trigger(this.model.get('name')) 
		},
		template : "<%= label %>"	
	})
	
	var ButtonsView = Backbone.Marionette.CompositeView.extend({
		itemView : ButtonView,
		template : ''
	})

	var wikipageButtons = Backbone.Marionette.Layout.extend({
		showEditButtons : function(){
			this.buttons.show(new ButtonsView({ collection : this.editButtons }))
		},	
		showSaveButtons : function(){
			this.buttons.show(new ButtonsView({ collection : this.saveButtons }))
		},			
		initialize : function(){		
			var container = this	
				
			this.editButtons = new Backbone.Collection([
				{ label : 'Edit', name : 'edit'}				
			])
			this.editButtons.on('edit', function(){
				this.showSaveButtons()
				container.trigger('edit')
			}, this)	
								
			this.saveButtons = new Backbone.Collection([
				{ label : 'Save', name : 'save'},
				{ label : 'Cancel', name : 'cancel'}										
			])			
			this.saveButtons.on('save', function(){
				container.trigger('save')							
			}, this)
			this.saveButtons.on('cancel', function(){
				this.showEditButtons()
				container.trigger('cancel')							
			}, this)		
						
		},	
		template : buttons,
		regions : {
			buttons : '.buttons-region'
		},
		onRender : function(){
			this.showEditButtons()
		}	
	})
	
	var WikipageBody = Backbone.Marionette.ItemView.extend({
		template : body
	})
	
	var WikipageEdit = Backbone.Marionette.ItemView.extend({
		template : edit,
		ui : {
			input : 'textarea'
		},		
		getContent : function(){
			return this.ui.input.val()
		}
	})	
	
	var WikipageView = Backbone.Marionette.Layout.extend({	
		template : html,
		ui : {
			content : '.content-region'
		},		
		regions : {
			buttons : '.buttons-region',
			content : '.content-region'
		}, 
		onRender : function(){
			this.content.show(new WikipageBody({ model : this.model }))		
			if (App.currentUser){
				this.buttons.show(new wikipageButtons({ model : this.model }))
				this.buttons.currentView.on('edit', function(){
					this.content.show(new WikipageEdit({ model : this.model }))
				}, this)
				var self = this
				this.buttons.currentView.on('save', function(){
					this.model.save({ content : self.content.currentView.getContent() }, {
						success : function(){
							self.content.show(new WikipageBody({ model : self.model }))					
							self.buttons.currentView.showEditButtons()						
						}			
					})
				})
				
				this.buttons.currentView.on('cancel', function(){
					this.content.show(new WikipageBody({ model : this.model }))
				}, this)
				
				
			}				
		}		
	})	
	
	return WikipageView	
})
