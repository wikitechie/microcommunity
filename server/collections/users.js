var Collection = require('./../collection')
	, ObjectId = require('mongodb').ObjectID

function Users(db){
	Collection.call(this, db, 'users') 
}

Users.prototype = Collection.prototype

Users.prototype.findByEmail = function(email, callback){
	this.findOne({ email : email }, callback)
}


module.exports = Users

