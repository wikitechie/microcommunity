define([
	'backbone',
	'models/item',
	'backbone-relational'
], function(Backbone, Item){

	/* 
		Collection events:
		-> newItem : triggered after a new item was inserted
		-> moreItemsLoaded
	*/

	return Items = Backbone.Collection.extend({
	
		currentIndex : 0,
		loadMoreCount : 5,
		loadable : true,
		
		url : function(){
			return 'wall/' + this.id 
		},
	
		initialize : function(models, options){
			if (options){
				this.id = options.id
			}			
		}, 
		
		model : Item,
		
		insertNewItem : function(attr, callback){		
			attr.wall = this.id
			var self = this
			return this.create(attr, {
				success : function(item, res, opt){
					self.trigger('newItem')
					callback(null, item)
				},
				error : function(){
					callback('error')
				}, 
				at : 0
			})			
		},
		
		loadMore : function(callback){
			var self = this
			this.fetch({
				success : function(collection, res, opt){
					if(collection.length == 0){
						self.loadable = false
					} else {
						self.currentIndex += collection.length		
						self.add(collection, { at : self.length })		
						self.trigger('moreItemsLoaded')				
					}
					callback()		
				},
				error : function(){
					callback(null)
				}
			})

		},
		
		mergeItems : function(){}
		
	})
})
