process.env.NODE_ENV = 'test'

var should = require('should')
	, helpers = require('./../helpers')
	
var postsController = require('./../../controllers/posts')	

describe('Posts Controller', function(){

	helpers.dbBefore()
	helpers.userSetup()

	describe ('create action', function(){
	
		it ('should create a new post object')
		it ('should create a new wallItem object with the right associations')	
		it ('should create a new activity object with the right associations')					
	})	
	
	helpers.dbAfter()	
})
