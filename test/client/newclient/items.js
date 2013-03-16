define([
	'modelsdraft/items',
	'modelsdraft/post'
], function(Items, Post) {
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
				assert.equal(items.first() instanceof Post, true)				
			})
		})
	})								
})
