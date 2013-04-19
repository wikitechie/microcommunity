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
		initialize : function(options){
			var opts = options || {}
			this.width = opts.width || '500px'
			this.type = opts.type || 'stream'
		},
		template : html,
		serializeData: function(){
			return this.model.serialize()	  
		},
		ui : {
			mainWrapper : '.mainWrapper'
		},
		regions : {
			content : '.content',
			message : '.message'
		},		
		defaultRenderer : function(){	
		
			var itemViewType = this.type
		
			function normalizeProperty(property){
				var normalized
				if ('function' == typeof property){
					if (property == 'function (){return c.apply(this,arguments)}'){
						normalized = property
					}					
					else {
						normalized = property(itemViewType)
					}
						
				} else {
					normalized = property
				}
				return normalized	
			}		
			
			//TODO: create a generic logic here		
			ContentView = normalizeProperty(this.model.contentView)
			if (ContentView){
				this.content.show(new ContentView({ model : this.model }))			
			}
			
			var MessageTemplate = normalizeProperty(this.model.messageTemplate)			
			if (MessageTemplate){				
				var message = new MessageView({
					model : this.model,
					template : MessageTemplate
				})
				this.message.show(message)				
			}

		},				
		onRender : function(){			
			this.ui.mainWrapper.css('max-width', this.width)
			if (this.type == 'wall'){
				this.defaultRenderer()
			} else if (this.type == 'stream') {
				this.defaultRenderer()		
			}
		}
	})	
	return ItemView	
})
