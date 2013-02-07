var Users = require('./collections/users')
	, Posts = require('./collections/posts')	

function Container(){
	this.collections = {}
}

Container.prototype.setup = function(db_conection){
	this.db = db_conection
	this.collections = {
		users : new Users(db_conection),
		posts : new Posts(db_conection),		
	}
}

module.exports = new Container()
