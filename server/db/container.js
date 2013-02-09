var Users = require('./collections/users')
	, Posts = require('./collections/posts')	
	, Walls = require('./collections/walls')
	, WallItems = require('./collections/wall_items')					

function Container(db){
	if(!db) throw new Error('Creating a container requires a mongodb Db object')
	this.db = db
}

Container.prototype.setup = function(){
	this.collections = {
		users : new Users(this.db),
		posts : new Posts(this.db),		
		walls : new Walls(this.db),				
		wallItems : new WallItems(this.db),						
	}
}


module.exports = Container
