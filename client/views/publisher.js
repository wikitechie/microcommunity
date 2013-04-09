define([
	'bb',
	'text!templates/publisher.html'
],function(Backbone, html){

	var PublisherView = Backbone.Marionette.ItemView.extend({
		template : html,
		
		ui : {
			input : '#new-post'
		},
		
		events : {
			'click #publish-button' : 'newPost'
		},		
		newPost : function(data){			
			var self = this			
			self.disable()		
			App.wall.createPost(App.currentUser.id , this.ui.input.val(), function(err, model){
				self.reset()
				self.enable()											
			})
		},
		reset : function(){
			this.ui.input.val("")
		},
		disable : function(){
			this.ui.input.prop("disabled", true)
		},
		enable : function(){
			this.ui.input.prop("disabled", false)
		}		
	})	
	
	return PublisherView
	
})
