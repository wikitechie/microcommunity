var database = require('./../db')
		
database.connect(function(err, container){	
	console.log('begining')
	require('./example2')
})

