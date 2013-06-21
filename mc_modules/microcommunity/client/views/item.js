define([
	'bb',
	'text!templates/item.html',
	'views/item/actions',
	'views/item/message',
	'views/item-plugins/comments'
], function(Backbone, html, ActionsView, MessageView, CommentsThread){

	var ItemView = Backbone.Marionette.Layout.extend({	
		initialize : function(options){
			var opts = options || {}
			this.type = opts.type || 'stream'
			this.wall = opts.wall
		},
		template : html,
		serializeData: function(){
			return _.extend(this.model.serialize())
		},
		regions : {
			content : '.content-region',
			message : '.message-region',
			actions : '.actions-region',
			plugin  : '.plugin-region'
		},		
		defaultRenderer : function(){	
		
			var itemViewType = this.type
			var wall = this.wall
			
			/* this helper function takes a property (of the contentView)
				 -> if it is a View it returns it
				 -> if it is a function, it calls it passing itemViewType (wall or stream) and the wall object
				 -> else it returns it as it is
			*/			
		
			function normalizeProperty(property){
				var normalized
				if ('function' == typeof property){
					//testing if the function is an ItemView	
					var instance = new property()
					if (instance instanceof Backbone.Marionette.ItemView){
						normalized = property					
					}			
					else {
						normalized = property(itemViewType, wall)
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
				
				if (ContentView.prototype.actions){	
					var actions = new Backbone.Collection(ContentView.prototype.actions)
					actions.on('all', function(action){
						this.content.currentView.trigger('action:' + action)
					}, this)		
					this.actions.show(new ActionsView({ collection : actions }))
				}							
			}
						
			var MessageTemplate = normalizeProperty(this.model.messageTemplate)			
			if (MessageTemplate){				
				var message = new MessageView({
					model : this.model,
					template : MessageTemplate
				})
				this.message.show(message)				
			}
			
			var PluginView = this.model.pluginView
			if (PluginView) {
				this.plugin.show(new PluginView({
					model : this.model 
				}))			
			}
			

			
		},				
		onRender : function(){			
			this.defaultRenderer()
		}
	})	
	return ItemView	
})
