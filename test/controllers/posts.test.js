var should = require('should')
	, helpers = require('./../helpers')
	
var postsController = require('./../../controllers/posts')	

describe('Posts Controller', function(){

	helpers.dbBefore()
	helpers.userSetup()

	describe ('create action', function(){
	
		before (function(done){
			var user = this.created_user
			this.collection = this.db.getCollection('users')
			var self = this
			
			postsController.create( 'hello, world', user._id.toString(), user.wall.toString(), 
				function(err, post){
					self.created_post = post
					done()
				})
		})
	
		it ('should return a new post object with an id', function(){
			should.exist(this.created_post)
			should.exist(this.created_post._id)			
		})
		
		it ('should return a new post associated to the right wall', function(){
			should.exist(this.created_post.wall)
			helpers.sameID(this.created_post.wall, this.created_user.wall)
		})

		it ('should create a new Item object with the right associations', function(done){
			var self = this
			this.db.getCollection('items').find().toArray(function(err, items){
				should.not.exist(err)
				items.length.should.equal(1)
				helpers.sameID(items[0]._id, self.created_post._id)
				done()
			})
		})	
		it ('should create a new activity object with the right associations')					
	})	
	
})
