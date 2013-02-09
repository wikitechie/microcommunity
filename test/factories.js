function Factories(){
	this.factories = {}	
	this.add('user', 'users', { email : 'test@email.com' })	
	
}

Factories.prototype.add = function(name, collection, obj){
	this.factories[name] = {
		attr : obj,
		collection : collection
	}
}

Factories.prototype.create = function(name){
	console.log(this.factories[name].attr)
	return new Object(this.factories[name].attr)
}


var factories = new Factories()
module.exports = factories


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
