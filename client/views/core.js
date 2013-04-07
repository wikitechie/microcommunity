define([
	'bb',
	'models/item',
	'bootstrap',
], function(Backbone, Item){

	var ItemView = Backbone.Marionette.ItemView.extend({
		template : '#item-template' 
	})
	
	var ItemsView = Backbone.Marionette.CompositeView.extend({
		template : '#items-template',
		itemView : ItemView,
		appendHtml : function(collectionView, itemView){
			//some models are added automatically by BackboneRelational before they are actually saved
			//so we just check if the model is new or not
			if (!itemView.model.isNew()) {
				collectionView.$('tbody').prepend(itemView.el)	
			}		
		}
	})
	
	var PublisherView = Backbone.Marionette.ItemView.extend({
		template : '#publisher-template',
		
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
	
	var Layout = Backbone.Marionette.Layout.extend({
		template : '#layout-template',
		regions : {
			publisher : '#publisher',
			items : '#items'
		}
	})
	
	return {
		ItemView : ItemView,
		ItemsView : ItemsView,
		PublisherView : PublisherView,
		Layout : Layout	
	}
	
})
