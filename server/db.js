var Db = require('mongodb').Db
  , Server = require('mongodb').Server
  , Collection = require('./collection')

function Database(){}

Database.prototype.setup = function(){	
	var connection	
	if (process.env.NODE_ENV == 'test') {	
		connection = new Db('microcommunity_test', new Server("127.0.0.1", 27017)	)
	} else {
		connection = new Db('test', new Server("127.0.0.1", 27017))	
	}
	this.connection = connection	
}

Database.prototype.connect = function(callback){
	var self = this	
	this.setup()
	this.connection.open(function(err, db){
		self.db = db
		if(callback) { callback(err, db) }		
	})	
}

Database.prototype.collection = function(name){
	return new Collection(this.db, name)
}

var database = module.exports = new Database()

database.Collection = Collection




