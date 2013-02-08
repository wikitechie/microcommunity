var db = require('./../db')

exports.create = function(attr, callback){
	db.getCollection('users').create(attr, callback)	
}
