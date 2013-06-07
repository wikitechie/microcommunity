define([
	'bb',
	'text!templates/new-attachement-modal.html'
],function(Backbone, html){
	
	var NewAttachementModal = Backbone.Marionette.Layout.extend({	
		className : 'modal fade',
		events : {
			'click .modal-submit' : 'submit'
		},
		ui : {
			file : '#file-radio',
			wikipage : '#wikipage-radio'
		},
		onRender : function(){
			$(this.el).modal()
		},
		show : function(){
			this.render()
		},	
		submit : function(){ 
			var location
			if(this.ui.wikipage.is(':checked'))
				location = ""
			else
				location = ""
				
			window.location.href = location			
		},		
		template : html
	})		
	
	return NewAttachementModal	
})
