define([
	'bb',
	'views/item',
	'text!templates/items.html'
], function(Backbone, ItemView, html){
	var ItemsView = Backbone.Marionette.CompositeView.extend({
		initialize : function(options){
			this.itemViewOptions = { width : options.width, type : options.type, wall : options.wall }
		},
		template : html,
		itemView : ItemView,
		appendHtml : function(collectionView, itemView, index){
			//some models are added automatically by BackboneRelational before they are actually saved
			//so we just check if the model is new or not
			if (!itemView.model.isNew()) {
				//when index is 0, we should prepend the item, not append it
				if (index == 0)
					collectionView.$('#items-collection').prepend(itemView.el)	
				else 
					collectionView.$('#items-collection').append(itemView.el)					
			}		
		}				 
	})	
	return ItemsView	
})
