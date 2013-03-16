define([
	'modelsdraft/user',
	'modelsdraft/stream'
], function(User, Stream) {						
	describe('Stream Model', function(){		
		describe ('Default stream', function(){
			var user, post, stream
			before(function(){
				user = new User({name : 'Name', id : 'user-1' }) 
				stream = new Stream({
					items : [
						{ id : 'item-1', content : "Post1", author : user, itemType : 'post' },
						{ id : 'item-2', content : "Post1", author : user, itemType : 'post' },
						{ id : 'item-3', content : "Post1", author : user, itemType : 'post' }
					]
				})
			})
			after(function(){
				Backbone.Relational.store.reset()
			})
			it ('should add the items to the stream', function(){
				stream.get('items').length.should.equal(3)
				assert.equal(stream.get('items').at(0) instanceof Post, true)
			})	
			
		})
	})						
})
