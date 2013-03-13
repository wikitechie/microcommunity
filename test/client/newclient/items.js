define([
	'newmodels/item',
	'newmodels/items',
], function(Item, Items){

	describe('Items Collection', function(){	
		before(function(){
			this.server = sinon.fakeServer.create()
		})	

		
		describe('insertNewItem', function(){
			before(function(done){
				this.items = new Items([], { id : '123' })
				
				this.newItemCallback = sinon.spy()
				this.items.on('newItem', this.newItemCallback)
				
				var self = this
				this.items.insertNewItem({ type : 'post' }, function(err, item){
					self.item = self.items.insertNewItem({ content : 'hello!' }, function(err, item){
						done()								
					})					
					self.server.requests[1].respond(
						200, { "Content-Type": "application/json" },
						JSON.stringify({ id: 16554, wall : 123 })
					)						
				})			
				this.server.requests[0].respond(
					200, { "Content-Type": "application/json" },
					JSON.stringify({ id: 1654, wall : 123 })
				)		
							
			})
		
			it('should return an item object', function(){				
				assert.ok(this.item)
				assert.ok(this.item instanceof Item)
				assert.ok(this.item.id)
			})			
			
			it('should return an item object associated with the right wall', function(){				
				assert.ok(this.item.get('wall'))
				assert.equal(this.item.get('wall'), this.items.id)
			})			

			it('should add the item object at the beginning of the collection', function(){
				this.items.length.should.equal(2)
				this.items.first().id.should.equal(this.item.id)
			})
			
			it('should trigger newItem event', function(){
				this.newItemCallback.called.should.equal(true)
			})
			
		
		})
		
		describe('loadMore', function(){
		
			before (function(){
				this.items = new Items([], { id : '3' })
				this.count = this.items.loadMoreCount = 5
			})
			
			it ('should be initially assinged as loadble', function(){
				this.items.loadable.should.equal(true)
			})
			
			it ('should add the specified number of items to the collection', function(done){
				var self = this
				var oldLength = this.items.length
				this.items.loadMore(function(){		
					self.items.length.should.equal(oldLength + self.count)
					done()
				})
				
				this.server.requests.slice(-1)[0].respond(
					200, { "Content-Type": "application/json" },
					JSON.stringify([
						{ id: 1, wall : 3 }, 
						{ id: 2, wall : 3 },
						{ id: 3, wall : 3 }, 
						{ id: 4, wall : 3 }, 
						{ id: 5, wall : 3 }																	
					])
				)									
			})				
			
			it ('should trigger moreItemsLoaded', function(done){
				var spy = sinon.spy()
				this.items.on('moreItemsLoaded', spy)
				this.items.loadMore(function(){
					spy.calledOnce.should.be.true
					done()
				})				
				this.server.requests.slice(-1)[0].respond(
					200, { "Content-Type": "application/json" },
					JSON.stringify([
						{ id: 1, wall : 3 }, 
						{ id: 2, wall : 3 },
						{ id: 3, wall : 3 }, 
						{ id: 4, wall : 3 }, 
						{ id: 5, wall : 3 }																	
					])
				)				
			})					
				
			it ('should disable loading when all items retreived', function(done){
				var self = this
				this.items.loadMore(function(){
					self.items.loadable.should.equal(false)
					done()
				})
				//responding with an empty string
				this.server.requests.slice(-1)[0].respond(
					200, { "Content-Type": "application/json" },
					JSON.stringify([])
				)						
			})				
		})	
		
		


	})
	
})
