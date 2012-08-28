var users_provider = require('./users-provider')
  , database = require('./db')
  , _ = require('underscore'); 

var db;

exports.setup = function (database){
	db = database;
	users_provider.setup(database);
};

