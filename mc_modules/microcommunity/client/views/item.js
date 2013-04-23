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
	
	var Action = Backbone.Model.extend({})
	var Actions = Backbone.Collection.extend({})
	var ActionView = Backbone.Marionette.ItemView.extend({
		tagName : 'span',
		className : 'action',
		events : {
			'click a' : 'click'
		},				
		template : '<a href=><%= label %></a> · ',
		model : Action,
		click : function(e){
			e.preventDefault()
			this.model.collection.trigger(this.model.get('name'))
		}
	})				
	var ActionsView = Backbone.Marionette.CompositeView.extend({
		tagName : 'span',
		template : '',
		itemView : ActionView
	})	

	var ItemView = Backbone.Marionette.Layout.extend({	
		initialize : function(options){
			var opts = options || {}
			this.width = opts.width || '510px'
			this.type = opts.type || 'stream'
			this.wall = opts.wall
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
			message : '.message',
			actions : '.actions'
		},		
		defaultRenderer : function(){	
		
			var itemViewType = this.type
			var wall = this.wall
		
			function normalizeProperty(property){
				var normalized
				if ('function' == typeof property){
					if (property == 'function (){return c.apply(this,arguments)}'){
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
					var actions = new Actions(ContentView.prototype.actions)
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
