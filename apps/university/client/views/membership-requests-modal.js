define([
	'bb',
	'text!templates/membership-requests-modal.html',
	'views/membership-requests'	
], function(Backbone, html, MembershipRequests){
	
	var Modal = Backbone.Marionette.Layout.extend({	
		initialize : function(options){
			this.ok = options.ok
		},
		regions : {
			modalBody : '.modal-body'
		},
		className : 'modal fade',
		events : {
			'click .modal-submit' : 'submit'
		},
		onRender : function(){
			$(this.el).modal()
			this.modalBody.show(new MembershipRequests({ 
				model: this.model, 
				collection : this.collection 
			}))					
		},
		show : function(){
			this.render()
		},	
		submit : function(){
			this.ok()
		},		
		disable : function(){
			this.ui.description.prop("disabled", true)
			this.ui.title.prop("disabled", true)
			this.ui.submit.addClass('disabled')
			this.ui.cancel.addClass('disabled')			
			$(this.el).spin()
		},
		template : html,
	})		
	
	return Modal	
})
