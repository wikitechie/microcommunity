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
	this.DB_SETUP = false 

}

Database.prototype.connect = function(callback){
	var self = this	
	this.connection.open(function(err, db){
		self.db = db
		self.container = new Container(db)
		self.container.setup()
		self.DB_SETUP = true	
		if(callback) { callback(err) }		
	})	
}

Database.prototype.getCollection = function(name){

	if (!this.DB_SETUP) throw new Error('Cannot get collection, database not setup yet')
	
	var collection = this.container.collections[name]
	if(!collection) throw new Error('Collection \'' + name + '\' ordered does not exist')	
	
	return collection
}
var database = module.exports = new Database()

database.mongo = require('mongodb')





