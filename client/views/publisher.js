define([
	'bb',
	'text!templates/publisher.html'
],function(Backbone, html){

	var PublisherView = Backbone.Marionette.ItemView.extend({
	
		initialize : function(options){
			if (options && options.wall){
				this.wall = options.wall
			}
		},
		
		template : html,
		
		ui : {
			input : '#new-post'
		},
		
		events : {
			'click #publish-button' : 'newPost'
		},	
			
		newPost : function(){	
				
			this.disable()						
			var post = {
				content : this.ui.input.val(),
				author : App.currentUser.id,
				wall : this.wall.id,
				itemType : 'post'
			}
			
			App.trigger('publisher:post:new', post)
			
			var self = this
			App.once('publisher:release', function(){
				self.reset()
				self.enable()
			})
			
			setTimeout(function(){	
				console.debug('server timeout!')
				App.trigger('publisher:release')
			}, 10000)
			
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
