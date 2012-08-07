var Db = require('mongodb').Db,
	ObjectID = require('mongodb').ObjectID,
  Connection = require('mongodb').Connection,
  Server = require('mongodb').Server;

exports.connectDB = function(callback){

	if (process.env.NODE_ENV == 'test') {
		Db.connect('mongodb://localhost/microcommunity_test', function(err, database) {
			callback(err, database);			
		});
	} else {
		Db.connect('mongodb://localhost/microcommunity', function(err, database) {
			callback(err, database);
		});
	}
}

exports.normalizeID = function(id){
	var object;
	if (id === undefined) 
		throw new Error('undefined ID is given');
	if(id.constructor.name != 'ObjectID'){
		object = new ObjectID(id);
	}	else {
		object = new ObjectID(id.toString());
	}			
	return object;
}
