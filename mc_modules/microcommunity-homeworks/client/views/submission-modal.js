define([
	'bb',
	'text!templates/submission-modal.html',
	'models/submission'
], function(Backbone, html, Submission){
	
	var NewSectionModal = Backbone.Marionette.Layout.extend({	
		className : 'modal fade',
		events : {
			'click .modal-submit' : 'submit'
		},
		ui : {
			comment : '.input-comment',
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
			
			var submission = new Submission({ 
				student : App.currentUser.id,
				comment : this.ui.comment.val(),
				homework : this.model.id
			})			
			
			var self = this			
			submission.save({}, {
				success : function(model, response, options){
					$(self.el).modal('hide')
				}
			})				

		},		
		disable : function(){
			this.ui.comment.prop("disabled", true)
			this.ui.submit.addClass('disabled')
			this.ui.cancel.addClass('disabled')			
			$(this.el).spin()
		},
		template : html
	})		
	
	return NewSectionModal	
})
