var should = require('should')
	, helpers = require('./../helpers')
	, fixtures = require('./../fixtures')
	
var usersController = require('./../../controllers/users')	

describe('Users Controller', function(){
	
	helpers.dbBefore()
	
	describe ('create action', function(){
	
		before (function(done){		
			this.collection = this.db.getCollection('users')	
			this.test_user = fixtures.create('user')					
			
			//the actual operation
			var self = this
			usersController.create(this.test_user, function(err, user){
				should.not.exist(err)
				self.created_user = user
				done()
			})
								
		})
	
		it ('should return a new user object with an id', function(){	
			should.exist(this.created_user)
			should.exist(this.created_user._id)
		})		
		
		it ('should return a new user object referenced to a wall object', function(){	
			should.exist(this.created_user.wall)
		})		
		
		it( 'should create a new wall object with the right association', function(done){
			var self = this
			this.db.getCollection('walls').find().toArray(function(err, walls){
				walls.length.should.equal(1)
				helpers.sameID(walls[0]._id, self.created_user.wall)
				done()			
			})
		})
	
		it( 'should create a new stream object with the right association')
		
	})
	
	
})


		
