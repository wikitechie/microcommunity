process.env.NODE_ENV = 'test'

var should = require('should')
	, fixtures = require('./fixtures')

exports.sameID = function(id1, id2){
	id1.toString().should.equal(id2.toString())
}

exports.dbBefore = function(){
	function drop(db, callback){
		db.dropDatabase(function(err){
			callback()
		})	
	}

	before(function(done){
		this.db = require('./../db/db')
		if (!this.db.instance){
			var self = this
			this.db.connect(function(err){	
				drop(self.db.instance, done)			
			})	
		} else {
			drop(this.db.instance, done)			
		}		
	})		
}

exports.dbAfter = function(){
	after(function(done){
		this.db.instance.dropDatabase(function(err){
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
