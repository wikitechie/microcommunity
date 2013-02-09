process.env.NODE_ENV = 'test'

var db = require('./../../server/db/db')
	, usersController = require('./../../server/controllers/users')
	, should = require('should')

describe('Users Controller', function(){

	var collection = null
	var test_user = {
		email : 'test@email.com'
	}		
	var created_user = null	
	
	before(function(done){
		db.connect(function(err){
			collection = db.getCollection('users')			
			//the actual operation
			usersController.create(test_user.email, function(err, user){
				created_user = user
				done()
			})			
		})	
	})		
			
	describe ('create action', function(){
	
		it ('should create a new user object', function(done){	
			collection.count(function(err, count){
				count.should.equal(1)
				done()
			})
		})		
		
		it( 'should create a new wall object with the right association', function(done){
			db.getCollection('walls').find().toArray(function(err, walls){
				walls.length.should.equal(1)
				walls[0]._id.toString().should.equal(created_user.wall.toString())
				done()			
			})
		})

	
		it( 'should create a new stream object with the right association')

		
	})
	
	after(function(done){
		db.db.dropDatabase(function(err){
			done()
		})
	})
	
	
	
})


		
