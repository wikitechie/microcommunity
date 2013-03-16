define([
	'modelsdraft/items',
	'modelsdraft/post'
], function(Items, Post) {
	describe ('Items Collection', function(){		
		describe ('Supporting Item subtypes', function(){
			before(function(){
				this.items = new Items()
			})
			after(function(){
				this.items = null
				Backbone.Relational.store.reset()
			})								
			it ('should support Post subtype', function(){
				this.items.add({
					itemType : 'post'
				})					
				assert.equal(this.items.first() instanceof Post, true)				
			})
		})
	})								
})
