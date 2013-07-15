define([
	'bb',
	'views/item',
	'models/item',
	'text!templates/items.html'
], function(Backbone, ItemView, Item, html){

			
	var ItemsFetch = Backbone.Collection.extend({
		model : Item
	})

	var ItemsView = Backbone.Marionette.CompositeView.extend({
	
		initialize : function(options){
			//options passed to each instance of ItemView
			this.itemViewOptions = { 
				parent : this.model				
			}
			
			//load more
			this.base = this.collection.last().id
			this.pageSize = 5
			this.currentPage = 0			
			this.loadMoreCollection = new ItemsFetch()	
			this.loadMoreCollection.url = this.model.url()
							
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
			var self = this

			this.loadMoreCollection.fetch({ 
				data : {
					base : this.base,
					pageSize : this.pageSize,
					page : this.currentPage
				},
				success : function(collection, response){
					self.currentPage++ 
					self.enabledLoad() 
					if (response.length == 0){
						self.setEndOfStream()
					} else {
						self.collection.add(response)					
					}
					
				},
				error : function(){ self.enabledLoad() }
			})			
		
		},
		setEndOfStream : function(){
			this.ui.loadMore.attr('disabled', true)	
			this.ui.loadMore.text("No thing more to load")		
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
