define([
	'modelsdraft/user',
	'modelsdraft/wall',	
	'modelsdraft/item',	
], function(User, Wall, ItemModule) {						
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
					assert.equal(wall.get('items').first() instanceof ItemModule.Post, true)
				})
				
				
				it ('should insert an item associated with the wall', function(){
					//console.log(JSON.stringify(wall.get('items').first().get('wall').get('items').toJSON()))
					wall.get('items').first().get('wall').id.should.equal(wall.id)						
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
