define([
	'bb',
	'text!templates/publishers/post.html'
], function(Backbone, html){

	var PostPublisher = Backbone.Marionette.ItemView.extend({
		template : html,						
		ui : {
			content : '#post-content'
		},					
		events : {
			'click #post-content' : 'expand'
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
		objectType : 'post', 
		icon : 'icon-pencil', 
		label : 'Post', 
		view :  PostPublisher 
	}	
	
})
