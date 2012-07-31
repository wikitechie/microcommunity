var Db = require('mongodb').Db,
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
