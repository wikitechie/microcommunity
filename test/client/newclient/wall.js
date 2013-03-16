define([
	'modelsdraft/user',
	'modelsdraft/wall',
	'modelsdraft/post',	
], function(User, Wall, Post) {						
	describe('Wall model', function(){
		describe ('Wall belonging to a user', function(){
			var user, wall
			before(function(){
				Backbone.Relational.store.reset()
				user = new User({name : 'Name', id : 'user-1' , wall : 'wall-1' })	
				wall = new Wall({id : 'wall-1', owner : 'user-1'	})					
			})
			after(function(){
				Backbone.Relational.store.reset()
			})						
			it ('should have an owner association to the user', function(){
				wall.get('owner').should.be.ok
				wall.get('owner').id.should.equal(user.id)
			})			
		})
		
		describe ('Wall having a post', function(){
			var user, wall
			before(function(){
				Backbone.Relational.store.reset()
				user = new User({name : 'Name', id : 'user-1' , wall : 'wall-1' })	
				wall = new Wall({id : 'wall-1', owner : 'user-1'	})					
			})
			after(function(){
				Backbone.Relational.store.reset()
			})	
			
			describe ('Adding a new post to the wall', function(){
				before(function(){
					wall.get('items').add({
						content : "Hello, World!",
						author : this.user,
						itemType : 'post'							
					}, { at : 0 })						
				})
				after(function(){
					Backbone.Relational.store.reset()
				})
									
				it ('should have the new post inserted correctly', function(){
					wall.get('items').length.should.equal(1)
				})
				it ('should insert an item which is an instance of Post model', function(){		
					console.log(wall.get('items').first().toJSON())
					assert.equal(wall.get('items').first() instanceof Post, true)
				})
				it ('should insert an item associated with the wall', function(){
					wall.get('items').first().get('wall').id.should.equal(wall.id)						
				})					
			})
		})			
	})
						
})
