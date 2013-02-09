var database = require('./../db/db')
	, Document = require('./../db/document')
		
database.connect(function(err, db, container){

	/*
	doc  = new Document({}, 'users')	
	doc.save(function(err, doc){
		console.log(doc.toJSON())		
	})
	*/			
	require('./example2')
})

