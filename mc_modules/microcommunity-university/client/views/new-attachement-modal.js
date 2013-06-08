define([
	'bb',
	'text!templates/new-attachement-modal.html',
	'models/attachement'
],function(Backbone, html, Attachement){
	
	var NewAttachementModal = Backbone.Marionette.Layout.extend({	
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
			
			var section = this.model.collection.indexOf(this.model)
			var material = this.model.get('parent').id			
			
			var attachement = new Attachement({ 
				section : section,
				material : material,
				title : this.ui.title.val(),
				description : this.ui.description.val()				
			})			
			
			var self = this			
			attachement.save({}, {
				success : function(model, response, options){
					$(self.el).modal('hide')
					self.model.get('attachements').add(attachement)
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
	
	return NewAttachementModal	
})
