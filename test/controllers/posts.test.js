process.env.NODE_ENV = 'test'

var db = require('./../../db/db')
	, should = require('should')
	, helpers = require('./../helpers')
	
var postsController = require('./../../controllers/posts')	


describe('Posts Controller', function(){

	describe ('create action', function(){
		it ('should create a new post object')
		it ('should create a new wallItem object with the right associations')	
		it ('should create a new activity object with the right associations')					
	})
	
})
