define([
	'bb',
	'text!templates/course-header.html',
	'views/container-buttons'	
], function(Backbone, html, ContainerButtons){	

	var CourseHeader = Backbone.Marionette.Layout.extend({	
		template : html,
		regions : {
			button : "#button-region"
		},		
		onRender : function(){
			this.button.show(new ContainerButtons({ model : this.model }))
		}			
	})		
	
	return CourseHeader	
})
