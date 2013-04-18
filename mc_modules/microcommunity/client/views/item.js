define([
	'bb',
	'text!templates/item.html'
], function(Backbone, html){

	var MessageView = Backbone.Marionette.ItemView.extend({
		className : 'activityMessage',
		serializeData : function(){
			return this.model.serialize()	  
		},				
	})

	var ItemView = Backbone.Marionette.Layout.extend({	
		template : html,
		serializeData: function(){
			return this.model.serialize()	  
		},
		regions : {
			content : '.content',
			message : '.message'
		},
		onRender : function(){
			//TODO: create a generic logic here
			if (this.model.contentView){
				var View = this.model.contentView
				this.content.show(new View({ model : this.model }))			
			}			
			if (this.model.messageTemplate){
				var message = new MessageView({
					model : this.model,
					template : this.model.messageTemplate
				})
				this.message.show(message)			
			}
		}
	})	
	return ItemView	
})
