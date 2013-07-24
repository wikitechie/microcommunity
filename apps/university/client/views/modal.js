define([
	'bb',
	'text!templates/modal.html'
], function(Backbone, html){
	
	var Modal = Backbone.Marionette.Layout.extend({	
		initialize : function(options){
			this.ok = options.ok
		},
		className : 'modal fade',
		events : {
			'click .modal-submit' : 'submit'
		},
		onRender : function(){
			$(this.el).modal()
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
		template : html
	})		
	
	return Modal	
})
