define([
	'modelsdraft/user',
	'modelsdraft/item'	
], function(User, Item) {	
	describe ('Item Model', function(){	
		before(function(){
			this.user = new User({ id : 'user-1', name : 'User'})
			this.item = new Item({ id : 'item-1', author : 'user-1' })
		})
		after(function(){
			this.user = null
			this.item = null
			Backbone.Relational.store.reset()
		})
		it ('should have an author relation', function(){
			this.item.get('author').should.be.ok
		})
		it ('should have an objectType property \'item\'', function(){
			this.item.get('objectType').should.equal('item')
		})	
	})							
						
})
