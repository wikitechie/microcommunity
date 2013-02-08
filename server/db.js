var Db = require('mongodb').Db
  , Server = require('mongodb').Server
  , Container = require('./container')

function Database(){
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
	this.connection.open(function(err, db){
		self.db = db
		self.container = new Container(db)
		self.container.setup()
		
		if(callback) { callback(err, self.container) }		
	})	
}

Database.prototype.getCollection = function(name){
	collection = this.container.collections[name]
	return collection
}
var database = module.exports = new Database()




