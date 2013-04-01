var Db = require('mongodb').Db
  , Server = require('mongodb').Server
  , Container = require('./container')

function Database(){
	var connector	
	if (process.env.NODE_ENV == 'test') {	
		connector = new Db('microcommunity_test', new Server("127.0.0.1", 27017)	)
	} else {
		connector = new Db('microcommunity', new Server("127.0.0.1", 27017))	
	}	
	this.connector = connector
}

Database.prototype.connect = function(callback){
	var self = this	
	this.connector.open(function(err, db){
		self.instance = db
		self.container = new Container(self)
		self.container.setup()
		if(callback) { callback(err) }		
	})	
}

Database.prototype.getCollection = function(name){
	if (!this.instance) throw new Error('Cannot get collection, database not setup yet')	
	var collection = this.container.get(name)
	if(!collection) throw new Error('Collection \'' + name + '\' ordered does not exist')		
	return collection
}

Database.prototype.addCollection = function(name, options){
	return this.container.add(name, options)
}

Database.prototype.reset = function(){
	this.container.reset()
}

var database = module.exports = new Database()

database.mongo = require('mongodb')





