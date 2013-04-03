var Users = require('./collections/users')
	, Posts = require('./collections/posts')	
	, Walls = require('./collections/walls')
	, Items = require('./collections/items')	
	, Collection = require('./collection')



function Container(db){
	if(!db) throw new Error('Creating a container requires a mongodb Db object')
	this.db = db
	this.collections = []
}

Container.prototype.setup = function(){
	this.collections = {
		users : new Users(this.db),
		posts : new Posts(this.db),		
		walls : new Walls(this.db),				
		items : new Items(this.db),						
	}
	
}

Container.prototype.get = function(name){
	return this.collections[name]
}

Container.prototype.add = function(name, options){
	return this.collections[name] = new Collection(this.db, name, options)
}

Container.prototype.reset = function(){
	this.collections = []
}


module.exports = Container
