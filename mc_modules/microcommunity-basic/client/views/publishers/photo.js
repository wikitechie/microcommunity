define([
	'bb',
	'text!templates/publishers/photo.html'
], function(Backbone, html){

	var PhotoPublisher = Backbone.Marionette.ItemView.extend({
		template : html,						
		ui : {
			content : '#photo-content'
		},						
		exportData : function(){
			return {
				content : this.ui.content.val()
			}						
		},	
		reset : function(){
			this.ui.content.val("")
		},		
		disable : function(){
			this.ui.content.prop("disabled", true)
		},		
		enable : function(){
			this.ui.content.prop("disabled", false)			
		}								
								
	})		
	
	return 	{ 
		objectType : 'photo', 
		icon : 'icon-camera', 
		label : 'Photo', 
		view : PhotoPublisher 
	}		
	
})
