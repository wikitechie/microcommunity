define([
	'modelsdraft/user',
	'modelsdraft/post',		
	'modelsdraft/wall',
	'modelsdraft/stream'	
], function(User, Post, Wall, Stream) {							
	describe('Post model', function(){			
		describe('A post on author\'s own wall', function(){
			var user, wall
			before(function(){
				user = new User({name : 'Name', id : 'user-1' , wall : 'wall-1' })	
				wall = new Wall({id : 'wall-1', owner : 'user-1'	})	
				wall.get('items').add({
					content : "Hello, World!",
					author : user,
					itemType : 'post'							
				}, { at : 0 })										
			})
			after(function(){
				Backbone.Relational.store.reset()
			}) 
			it ('should be associated back to its wall', function(){
				wall.get('items').first().get('wall').should.be.ok
				wall.get('items').first().get('wall').id.should.equal(wall.id)
			})			
			it ('should display the right message', function(){
				wall.get('items').first().msg()
					.should.equal("Name posted on his wall Hello, World!")
			})			
		})
		
		describe('A post on another user\'s wall', function(){
			var user1, user2, wall1, wall2
			before(function(){
				Backbone.Relational.store.reset()
				user1 = new User({name : 'User 1', id : 'user-1' , wall : 'wall-1' })
				user2 = new User({name : 'User 2', id : 'user-2' , wall : 'wall-2' })							
				wall1 = new Wall({id : 'wall-1', owner : 'user-1'	})	
				wall2 = new Wall({id : 'wall-2', owner : 'user-2'	})											
				wall2.get('items').add({
					content : "Hello, User 2! I am User 1",
					author : user1,
					itemType : 'post'							
				}, { at : 0 })										
			})				
			after(function(){
				Backbone.Relational.store.reset()
			})
			it ('should display the right message', function(){
				wall2.get('items').first().msg()
					.should.equal("User 1 posted on User 2's wall Hello, User 2! I am User 1")
			})			
		})
	})						
					
})
