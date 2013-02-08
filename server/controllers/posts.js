var db = require('./../db')

exports.create = function(attr, callback){
	db.getCollection('posts').create(attr, callback)	
}
