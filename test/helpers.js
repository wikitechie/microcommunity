var should = require('should')
	, fixtures = require('./fixtures')

exports.sameID = function(id1, id2){
	id1.toString().should.equal(id2.toString())
}

exports.dbBefore = function(){
	before(function(done){
		this.db = require('./../db/db')
		if (!this.db.db){
			this.db.connect(function(err){		
				done()		
			})	
		} else {
			done()
		}		
	})		
}

exports.dbAfter = function(){
	after(function(done){
		this.db.db.dropDatabase(function(err){
			done()
		})
	})	
}

exports.userSetup = function( user ){

	if ( !user )
		var user = fixtures.create('user')	

	before(function(done){
		var self = this
		var usersController = require('./../controllers/users')	
		usersController.create(user, function(err, user){
			self.created_user = user
			done(err)
		})			
	})
	
}
