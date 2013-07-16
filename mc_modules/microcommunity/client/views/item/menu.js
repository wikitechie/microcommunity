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
			this.model.collection.trigger(this.model.get('name'), this.options.item)
		}		
	})

	var ItemMenuView = Backbone.Marionette.CompositeView.extend({
		itemViewOptions : function(){
			return {
				item : this.model
			}
		},
		itemView : MenuEntry, 
		template : html,
		appendHtml : function(collectionView, itemView){
			collectionView.$('.dropdown-menu').append(itemView.el)
		}
	})
	
	return ItemMenuView
		
})
