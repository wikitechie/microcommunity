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

