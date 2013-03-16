define([
	'modelsdraft/user',
	'modelsdraft/wall',
	'modelsdraft/post',	
], function(User, Wall, Post) {						
	describe('Wall model', function(){
		describe ('Wall belonging to a user', function(){
			before(function(){
				Backbone.Relational.store.reset()
				this.user = new User({name : 'Name', id : 'user-1' , wall : 'wall-1' })	
				this.wall = new Wall({id : 'wall-1', owner : 'user-1'	})					
			})
			after(function(){
				this.user = null
				this.wall = null			
				Backbone.Relational.store.reset()
			})						
			it ('should have an owner association to the user', function(){
				this.wall.get('owner').should.be.ok
				this.wall.get('owner').id.should.equal(this.user.id)
			})			
		})
		
		describe ('Wall having a post', function(){
			describe ('Adding a new post to the wall', function(){
				before(function(){
					this.user = new User({name : 'Name', id : 'user-1' , wall : 'wall-1' })	
					this.wall = new Wall({id : 'wall-1', owner : 'user-1'	})					
					this.wall.get('items').add({
						content : "Hello, World!",
						author : this.user,
						itemType : 'post'							
					}, { at : 0 })						
				})				
									
				it ('should have the new post inserted correctly', function(){
					this.wall.get('items').length.should.equal(1)
				})
				it ('should insert an item which is an instance of Post model', function(){		
					assert.equal(this.wall.get('items').first() instanceof Post, true)
				})
				it ('should insert an item associated with the wall', function(){
					this.wall.get('items').first().get('wall').id.should.equal(this.wall.id)						
				})
				after(function(){
					this.user = null
					this.wall = null
					Backbone.Relational.store.reset()
				})									
			})
		})			
	})
						
})
