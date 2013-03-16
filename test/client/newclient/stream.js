define([
	'modelsdraft/user',
	'modelsdraft/stream'
], function(User, Stream) {						
	describe('Stream Model', function(){		
		describe ('Default stream', function(){
			before(function(){
				this.user = new User({name : 'Name', id : 'user-1' }) 
				this.stream = new Stream({
					items : [
						{ id : 'item-1', content : "Post1", author : this.user, itemType : 'post' },
						{ id : 'item-2', content : "Post1", author : this.user, itemType : 'post' },
						{ id : 'item-3', content : "Post1", author : this.user, itemType : 'post' }
					]
				})
			})
			after(function(){
				this.user = null
				this.stream = null
				Backbone.Relational.store.reset()
			})
			it ('should add the items to the stream', function(){
				this.stream.get('items').length.should.equal(3)
				assert.equal(this.stream.get('items').at(0) instanceof Post, true)
			})	
			
		})
	})						
})
