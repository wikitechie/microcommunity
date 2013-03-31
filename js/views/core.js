define([
	'bb',
	'models/item',
], function(Backbone, Item){

	var ItemView = Backbone.Marionette.ItemView.extend({
		template : '#item-template' 
	})
	
	var ItemsView = Backbone.Marionette.CompositeView.extend({
		template : '#items-template',
		itemView : ItemView,
		appendHtml : function(collectionView, itemView){
			collectionView.$('tbody').prepend(itemView.el)	
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
		
			var post = new Item({
				content : this.ui.input.val(),
				itemType : 'post',
				author : 'user-1',
				wall : 'wall-1'
			})
			
			post.save()
		
			App.vent.trigger('post:new', {
				content : this.ui.input.val(),
				author : 'user-1'				
			})			
			this.reset()
		},
		reset : function(){
			this.ui.input.val("")
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
