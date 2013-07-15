define([
	'bb',
	'views/item',
	'models/item',
	'text!templates/items.html'
], function(Backbone, ItemView, Item, html){
	var ItemsView = Backbone.Marionette.CompositeView.extend({
		initialize : function(options){
			//options passed to each instance of ItemView
			this.itemViewOptions = { 
				type : options.type, 
				wall : options.wall 
			}
			this.base = this.collection.last().id
			this.pageSize = 5
			this.currentPage = 0				
		},	
		template : html,
		itemView : ItemView,	
		events : {
			'click .btn-load-more' : 'loadMore'
		},
		ui : {
			loadMore : '.btn-load-more',
			spinner : '.load-more-spinner'
		},
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
		},
		loadMore : function(){
		
			this.disableLoad()
			
			var ItemsFetch = Backbone.Collection.extend({
				model : Item,
				url : '/api/streams/global'
			})
			
			var self = this		
			var fetch = new ItemsFetch()
			fetch.fetch({ 
				data : {
					base : this.base,
					pageSize : this.pageSize,
					page : this.currentPage
				},
				success : function(collection, response){
					self.currentPage++ 
					self.enabledLoad() 
					self.collection.add(response)					
				},
				error : function(){ self.enabledLoad() }
			})
			
		
		},
		disableLoad : function(){
			this.ui.spinner.css('visibility', 'visible')						
			this.ui.loadMore.attr('disabled', true)
		},
		enabledLoad : function(){
			this.ui.spinner.css('visibility', 'hidden')								
			this.ui.loadMore.attr('disabled', false)		
		},
		onRender : function(){
			this.ui.spinner.css('visibility', 'hidden')			
		}
		
						 
	})	
	return ItemsView	
})
