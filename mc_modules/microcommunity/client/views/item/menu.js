define([
	'bb',
	'text!templates/item/menu.html'
], function(Backbone, html){


	var MenuEntry = Backbone.Marionette.ItemView.extend({
		tagName : 'li',
		template : "<a href=#><%= label %></a>",
		events : {
			'click a' : 'click'
		},
		click : function(e){
			e.preventDefault()
			this.model.collection.trigger(this.model.get('name'))
		}		
	})

	var ItemMenuView = Backbone.Marionette.CompositeView.extend({
		itemView : MenuEntry, 
		template : html,
		appendHtml : function(collectionView, itemView){
			collectionView.$('.dropdown-menu').append(itemView.el)
		}
	})
	
	return ItemMenuView
		
})
