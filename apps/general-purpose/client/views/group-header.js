define([
	'bb',
	'text!templates/group-header.html',
	'views/container-buttons'
], function(Backbone, html, ContainerButtons){

	var GroupHeader = Backbone.Marionette.Layout.extend({	
		template : html,
		regions : {
			button : "#button-region"
		},		
		onRender : function(){
			this.button.show(new ContainerButtons({ model : this.model }))
		}				
	})		
	
	return GroupHeader	
})
