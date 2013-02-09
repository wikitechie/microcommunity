process.env.NODE_ENV = 'test'

var db = require('./../../db/db')
	, should = require('should')
	, helpers = require('./../helpers')
	, factories = require('./../factories')
	
var usersController = require('./../../controllers/users')	

describe('Users Controller', function(){

	var collection = null
	var test_user = factories.create('user')
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
				helpers.sameID(walls[0]._id, created_user.wall)
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


		
