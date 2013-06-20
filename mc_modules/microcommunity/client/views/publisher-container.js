define([
	'bb',
	'text!templates/publisher-container.html',
	'models/items',
], function(Backbone, html, Items){

	//nav elements
	var PublisherNavElement = Backbone.Marionette.ItemView.extend({
		initialize : function(){
			this.model.bind('change:active', this.render)		
		},
		template : "<a href='#'><i class='<%= icon %>'></i> <%= label %></a>",
		onRender : function(){
			if (this.model.get('active')){
				this.setActive()						
			} else {
				this.removeActive()
			}
		},
		events : {
			'click' : 'activate'
		},
		tagName : 'li',
		setActive : function(){
			$(this.el).addClass('active')
		},
		removeActive : function(){
			$(this.el).removeClass('active')
		},
		activate : function(e){
			e.preventDefault()
			if (!this.model.get('active'))
				this.model.set({ active : true })
		}	
	})

	var PublisherNav = Backbone.Marionette.CompositeView.extend({
		initialize : function(){
			var self = this
			this.collection.on("change:active", function(model, value, options){
				if (value == true){
					self.collection.forEach(function(publisher){
						if (publisher != model){
							publisher.set({ active : false })
						}
					})				
				}				
			})			
		},
		template : '',
		tagName : 'ul',
		className : 'nav nav-pills',
		itemView : PublisherNavElement
	})	
	

	var PublisherContainer = Backbone.Marionette.Layout.extend({				
		template : html,
		initialize : function(options){		
			if (options && options.wall){
				this.wall = options.wall
			}	
			
			this.default = options.default || this.collection.at(0).get('objectType')
			
			this.collection.on('change:active', function(model, value){
				if (value == true) {
					var objectType = model.get('objectType')
					this.displayPublisher(objectType)
				}
			}, this)
						
		},
		events : {
			'click #publish-button' : 'publish'
		},
		ui : {
			button : '#publish-button'
		},
		regions : {
			publisherNav : '.publisher-nav-region',
			publisherForm : '.publisher-form-region'			
		},	
		publish : function(){
		
			var objectType = this.getCurrentPublisher()
			var data = this.getCurrentData()
						
			var itemHash = {
				objectType : objectType,
				wall : this.wall.id,
				author : App.currentUser.id,
			}
			
			_.extend(itemHash, data)
			
			var items = new Items([ itemHash ])
			
			var item = items.at(0)
			
			var self = this							
			item.save({}, {
				success : function(model){
					App.vent.trigger('publisher:newitem', model)	
					self.reset()
					self.enable()											
				}, 
				error : function(model, xhr, options){
					alert('error')
					self.enable()					
				},								
			})			

		},				
		onRender : function(){	
			var publisherNavView = new PublisherNav({ collection : this.collection })			
			this.publisherNav.show(publisherNavView)			
			this.displayPublisher('post')								
		},
		
		getPublisher : function(objectType){		
			return this.collection.find(function(publisher){ return ( publisher.get('objectType') == objectType) })
		},
		
		getCurrentPublisher : function(){
			return this.publisherForm.currentView.model.get('objectType')
		},
		
		getCurrentPublisherView : function(){
			return this.publisherForm.currentView
		},
		
		getCurrentData : function(){		
			return this.publisherForm.currentView.exportData()		
		},
		
		displayPublisher : function(objectType){		
			var publisher = this.getPublisher(objectType)	
			var PublisherFormView = publisher.get('view')
			var publisherForm = new PublisherFormView({ model : publisher })
			this.publisherForm.show(publisherForm)
			publisher.set({active : true})		
		},
		
		reset : function(){
			this.getCurrentPublisherView().reset()
		},
		
		disable : function(){
			this.getCurrentPublisherView().disable()
			this.ui.button.addClass('disabled')
			$(this.el).spin()
		},
		
		enable : function(){
			this.getCurrentPublisherView().enable()
			this.ui.button.removeClass('disabled')
			$(this.el).spin(false)				
		}			
		
		
		
	})	
	return PublisherContainer	
	
})
