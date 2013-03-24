define([
	'modelsdraft/user',
	'modelsdraft/item',		
	'modelsdraft/wall',
], function(User, ItemModule, Wall) {							
	describe('Post model', function(){			
		describe('A post on author\'s own wall', function(){
			before(function(){
				this.user = new User({name : 'Name', id : 'user-1' , wall : 'wall-1' })	
				this.wall = new Wall({id : 'wall-1', owner : 'user-1'	})	
				this.wall.get('items').add({
					content : "Hello, World!",
					author : this.user,
					itemType : 'post'							
				}, { at : 0 })										
			})
			after(function(){
				this.user = null
				this.wall = null
				Backbone.Relational.store.reset()
			}) 
			it ('should be associated back to its wall', function(){
				assert.ok(this.wall.get('items').first().get('wall'))
				assert.ok(this.wall.get('items').first().get('wall').id)				
				assert.equal(this.wall.get('items').first().get('wall').id, this.wall.id)
			})			
			it ('should display the right message', function(){
				assert.equal(this.wall.get('items').first().msg(), "Name posted on his wall Hello, World!")				
			})			
		})
		
		describe('A post on another user\'s wall', function(){
			before(function(){
				this.user1 = new User({name : 'User 1', id : 'user-1' , wall : 'wall-1' })
				this.user2 = new User({name : 'User 2', id : 'user-2' , wall : 'wall-2' })							
				this.wall1 = new Wall({id : 'wall-1', owner : 'user-1'	})	
				this.wall2 = new Wall({id : 'wall-2', owner : 'user-2'	})											
				this.wall2.get('items').add({
					content : "Hello, User 2! I am User 1",
					author : this.user1,
					itemType : 'post'							
				}, { at : 0 })										
			})				
			after(function(){
				this.user1 = null
				this.user2 = null
				this.wall1 = null
				this.wall2 = null
				Backbone.Relational.store.reset()
			})
			it ('should display the right message', function(){
				this.wall2.get('items').first().msg()
					.should.equal("User 1 posted on User 2's wall Hello, User 2! I am User 1")
			})			
		})
	})						
					
})
