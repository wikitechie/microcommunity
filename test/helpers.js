var should = require('should')

exports.sameID = function(id1, id2){
	id1.toString().should.equal(id2.toString())
}

exports.dbBefore = function(){

	before(function(done){
		this.db = require('./../db/db')
		this.db.connect(function(err){		
			done()		
		})	
	})		
}

exports.dbAfter = function(){

	after(function(done){
		this.db.db.dropDatabase(function(err){
			done()
		})
	})
	
}
