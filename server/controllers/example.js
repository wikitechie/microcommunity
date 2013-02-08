var database = require('./../db')
		
database.connect(function(err, container){	
	require('./example2')
})

