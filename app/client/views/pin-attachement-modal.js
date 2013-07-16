define([
	'bb',
	'text!templates/pin-attachement-modal.html',
	'models/attachement',
	'models/wikipages'
], function(Backbone, html, Attachement, Wikipages){	
	
	var SectionOptionView = Backbone.Marionette.ItemView.extend({
		tagName : 'option',
		template : '<%= title %>',
		onRender : function(){
			$(this.el).attr('value', this.model.id)
		}
	})		
	
	var SectionSelect = Backbone.Marionette.CompositeView.extend({
		tagName : 'select',
		template : '',
		events : {
			'click' : 'onSelected'
		},		
		itemView : SectionOptionView,
		onSelected : function(){
			var id = $(this.el).find('option:selected').attr('value')
			this.options.selectedSection.set('id', id)
		}	
	})	
		
	
	var PinAttachementModal = Backbone.Marionette.Layout.extend({	
		className : 'modal fade',
		events : {
			'click .modal-submit' : 'submit'
		},
		ui : {
			title : '.input-title',
			description : '.input-description',
			submit : '.modal-submit',
			cancel : '.modal-cancel',			
		},
		regions : {
			sectionSelect : '.section-select-region',
		},
		onRender : function(){
			$(this.el).modal()
			
			this.selectedSection = new Backbone.Model({ id : this.model.get('sections').first().id })
			
			this.sectionSelect.show(new SectionSelect({ 
				collection : this.model.get('sections'),
				selectedSection : this.selectedSection
			}))
											
		},
		show : function(){
			this.render()
		},			
		submit : function(){ 
			this.disable()		
						
			var attachement = new Attachement({ 
				section : this.selectedSection.id,
				material : this.model.id,
				title : this.ui.title.val(),
				description : this.ui.description.val(),
				object : {
					id : this.options.resource.id,
					type : this.options.resource.get('objectType')
				}
			})
			
			var self = this			
			attachement.save({}, {
				success : function(model, response, options){
					$(self.el).modal('hide')
				}
			})

		},	
		disable : function(){
			this.ui.description.prop("disabled", true)
			this.ui.title.prop("disabled", true)
			this.ui.submit.addClass('disabled')
			this.ui.cancel.addClass('disabled')			
			$(this.el).spin()
		},				
		template : html
	})		
	
	return PinAttachementModal	
})
