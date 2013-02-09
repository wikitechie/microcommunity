var database = require('./../db/db')
		
database.connect(function(err, db, container){

	require('./example2')
})

