define([
	'modelsdraft/core',
	'backbone',
	'backbone-relational'
], function(Core) {		
	
	describe('User Model', function(){
		var user, wall			
		before(function(){		
			user = new Core.User({name : 'Name', id : 'user-1' })	
			wall = new Core.Wall({id : 'wall-1', owner : 'user-1'	})						
		})
		
		after(function(){
			Backbone.Relational.store.reset()			
		})						
		it ('should have an wall association to the Wall', function(){
			user.get('wall').should.be.ok
			user.get('wall').id.should.equal( wall.id)
		})	
	})

	describe ('Item Model', function(){	
		var user, item
		before(function(){
			user = new Core.User({ id : 'user-1', name : 'User'})
			item = new Core.Item({ id : 'item-1', author : 'user-1' })
		})
		after(function(){
			Backbone.Relational.store.reset()		
			user = null
			item = null
		})
		it ('should have an author relation', function(){
			item.get('author').should.be.ok
			assert.equal(item.get('author') instanceof Core.User, true)			
		})
		it ('should have an objectType property \'item\'', function(){
			item.get('objectType').should.equal('item')
		})	
	})
	
	describe ('Items Collection', function(){		
		describe ('Supporting Item subtypes', function(){
			var items
			before(function(){
				items = new Core.Items()
			})
			after(function(){
				Backbone.Relational.store.reset()			
			})									
			it ('should support Post subtype', function(){
				items.add({
					itemType : 'post'
				})					
				assert.equal(items.first() instanceof Core.Post, true)				
			})
		})
	})	
	
	describe('Stream Model', function(){		
		describe ('Default stream', function(){
			var user, stream
			before(function(){
				user = new Core.User({name : 'Name', id : 'user-1' }) 
				stream = new Core.Stream({
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
				assert.equal(stream.get('items').at(0) instanceof Core.Post, true)
			})				
		})
	})
	
	describe('Wall model', function(){
		describe ('Wall having a post', function(){
			var user, wall				
			describe ('Adding a new post to the wall', function(){
				before(function(){			
					user = new Core.User({name : 'Name', id : 'user-1'  })
					wall = new Core.Wall({ 
						id : 'wall-1', 
						owner : 'user-1',
						items : [{
							id : 'item-1',
							content : "Hello, World!",
							author : user,
							itemType : 'post',
						}] 
					})							
				})		
		
				after(function(){
					Backbone.Relational.store.reset()
				})										
				it ('should have the new post inserted correctly', function(){
					wall.get('items').length.should.equal(1)
				})
				
				it ('should insert an item which is an instance of Post model', function(){	
					assert.equal(wall.get('items').first() instanceof Core.Post, true)
				})	
				
				it ('should insert an item associated with the wall', function(){
					assert.equal(wall.get('items').first().get('wall') instanceof Core.Wall, true)					
				})
								
			})
		})
	
		describe ('Wall belonging to a user', function(){
			var user, wall			
			before(function(){		
				user = new Core.User({name : 'Name', id : 'user-1' })	
				wall = new Core.Wall({id : 'wall-1', owner : 'user-1'	})						
			})

			after(function(){
				Backbone.Relational.store.reset()			
			})						
			it ('should have an owner association to the user', function(){
				wall.get('owner').should.be.ok
				wall.get('owner').id.should.equal( user.id)
			})			
		})					
	})
	
	describe('Post model', function(){			
		describe('A post on author\'s own wall', function(){
			before(function(){
				this.user = new Core.User({name : 'Name', id : 'user-1' , wall : 'wall-1' })	
				this.wall = new Core.Wall({id : 'wall-1', owner : 'user-1'	})	
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
				this.user1 = new Core.User({name : 'User 1', id : 'user-1' , wall : 'wall-1' })
				this.user2 = new Core.User({name : 'User 2', id : 'user-2' , wall : 'wall-2' })							
				this.wall1 = new Core.Wall({id : 'wall-1', owner : 'user-1'	})	
				this.wall2 = new Core.Wall({id : 'wall-2', owner : 'user-2'	})											
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
