define([
	'modelsdraft/items',
	'modelsdraft/item'
], function(Items, Item) {
	describe ('Items Collection', function(){		
		describe ('Supporting Item subtypes', function(){
			var items
			before(function(){
				items = new Items()
			})
			after(function(){
				Backbone.Relational.store.reset()			
			})									
			it ('should support Post subtype', function(){
				items.add({
					itemType : 'post'
				})					
				assert.equal(items.first() instanceof Item.Post, true)				
			})
		})
	})								
})
