define([
	'bb',
	'text!templates/new-group-modal.html',
	'models/group'
], function(Backbone, html, Group){
	
	var Modal = Backbone.Marionette.Layout.extend({	
		className : 'modal fade',
		events : {
			'click .modal-submit' : 'submit'
		},
		ui : {
			name : '.input-name',
			description : '.input-description'			
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
		
		ok : function(){
			var group = new Group()
			
			group.save({
				displayName : this.ui.name.attr('value'),
				description : this.ui.description.val()
			}, {
				success : function(model){
					console.log('hey')
					window.location = group.link()
				},
				error : function(){
					console.log('error')				
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
	
	return Modal	
})
