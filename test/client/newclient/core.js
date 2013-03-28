define([
	'modelsdraft/core',
	'backbone',
	'backbone-relational'
], function(Core) {		
	
	describe('User Model', function(){
		var user, wall			
		before(function(){		
			user = new User({name : 'Name', id : 'user-1' })	
			wall = new Wall({id : 'wall-1', owner : 'user-1'	})						
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
			user = new User({ id : 'user-1', name : 'User'})
			item = new Item({ id : 'item-1', author : 'user-1' })
		})
		after(function(){
			Backbone.Relational.store.reset()		
			user = null
			item = null
		})
		it ('should have an author relation', function(){
			item.get('author').should.be.ok
		})
		it ('should have an objectType property \'item\'', function(){
			item.get('objectType').should.equal('item')
		})	
	})
	
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
	
	describe('Stream Model', function(){		
		describe ('Default stream', function(){
			var user, stream
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
	
	describe('Wall model', function(){
		describe ('Wall having a post', function(){
			var user, wall				
			describe ('Adding a new post to the wall', function(){
				before(function(){			
					user = new User({name : 'Name', id : 'user-1'  })
					wall = new Wall({ 
						id : 'wall-1', 
						owner : 'user-1',
						items : [{
							id : 'item-1',
							content : "Hello, World!",
							author : user,
							itemType : 'post',
							wall : 'wall-1'
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
					assert.equal(wall.get('items').first() instanceof Post, true)
				})	
				
				it ('should insert an item associated with the wall', function(){
					console.log(wall.get('items').first().toJSON())
					assert.equal(wall.get('items').first().get('wall') instanceof Wall, true)					
				})								
			})
		})
	
		describe ('Wall belonging to a user', function(){
			var user, wall			
			before(function(){		
				user = new User({name : 'Name', id : 'user-1' })	
				wall = new Wall({id : 'wall-1', owner : 'user-1'	})						
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
						
})
