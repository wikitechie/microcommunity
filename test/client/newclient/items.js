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
				Backbone.Relational.store.reset()
				this.items = null
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
