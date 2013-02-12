function Fixtures(){
	this.fixtures = {}	
	this.add('user', 'users', { email : 'test@email.com' })	
	
}

Fixtures.prototype.add = function(name, collection, obj){
	this.fixtures[name] = {
		attr : obj,
		collection : collection
	}
}

Fixtures.prototype.create = function(name){
	return new Object(this.fixtures[name].attr)
}


var fixtures = new Fixtures()
module.exports = fixtures


/*
Factories.prototype.setup = function(db, callback){
	collection = db.getCollection('users')
	var self = this
	var attr = this.factories['user'].attr
	collection.create(attr, function(err, user){
		callback()
	})
}
*/

/*
var db = require('./../db/db')
db.connect(function(err){
	factories.setup(db, function(){
		console.log('done')
	})	
})
*/
