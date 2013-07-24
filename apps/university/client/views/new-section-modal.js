define([
	'bb',
	'text!templates/new-section-modal.html',
	'models/section'
],function(Backbone, html, Section){
	
	var NewSectionModal = Backbone.Marionette.Layout.extend({	
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
		onRender : function(){
			$(this.el).modal()
		},
		show : function(){
			this.render()
		},	
		submit : function(){ 
			this.disable()
			
			var section = new Section({ 
				material : this.model.id,
				title : this.ui.title.val(),
				description : this.ui.description.val()				
			})			
			
			var self = this			
			section.save({}, {
				success : function(model, response, options){
					$(self.el).modal('hide')
					self.model.get('sections').add(section)
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
	
	return NewSectionModal	
})
