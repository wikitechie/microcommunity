var should = require('should')

exports.sameID = function(id1, id2){
	id1.toString().should.equal(id2.toString())
}

