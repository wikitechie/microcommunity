define([
	'bb',
	'text!templates/publishers/question.html'
], function(Backbone, html){

	var QuestionPublisher = Backbone.Marionette.ItemView.extend({
		template : html,						
		ui : {
			content : '#content'
		},					
		events : {
			'click #content' : 'expand'
		},	
		exportData : function(){
			return {
				content : this.ui.content.val()
			}						
		},		
		expand : function(){
			this.ui.content.attr("rows","3")			
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
	
	return { 
		objectType : 'question', 
		icon : 'icon-question-sign', 
		label : 'Question', 
		view :  QuestionPublisher 
	}	
	
})
