process.env.NODE_ENV = 'test';

var assert = require("assert")
	, wikipages_provider = require('./../../providers/wikipages-provider')
	, database = require('./../../providers/db');


describe('WikiPages Provider', function(){

	var db ;
	before(function(done){
		database.connectDB(function(err, database){
			db = database;
			wikipages_provider.setup(database);			
			resetDatabase(done);
		});
	})


  
  describe('createWikipage', function(){
  	before(function(done){  	
			resetDatabase(function(){
				var attr = {
					title : "Title",
					body  : "Body",
					created_at : new Date()  		
				} 		  		
			
				wikipages_provider.createWikiPage(attr, function(err, new_wikipage){
				resetDatabase(done);
				});			
			});
  	})
  
  	it('should create a new wikipage object', function(done){
  		db.collection('wikipages', function(err, wikipages){  		
  			wikipages.find().count(function(err, count){
					assert.equal(count, 1);
					done();  				
  			})
  		});
  	}) 	
  	  	
  	it('should create a new revision object', function(done){
  		db.collection('revisions', function(err, revisions){  		
  			revisions.find().count(function(err, count){
					assert.equal(count, 1);
					done();  				
  			})
  		});
  	})
  	
  	it('should create the correct wikipage object', function(done){
  		db.collection('wikipages', function(err, wikipages){
  			wikipages.findOne({}, function(err, wikipage){  			
  				db.collection('revisions', function(err, revisions){
  					revisions.findOne({}, function(err, revision){  					
  						assert.equal(wikipage.title, "Title")
  						assert.equal(wikipage.current_revision.toString(), revision._id.toString())
  						assert.equal(revision.body, "Body")  						
  						done()
  					})
  				})
  			})
  		})  		
		})

  })
  
  describe('fetch', function(){
  	var wikipage_id, revision_id;
  	before(function(done){  		
			resetDatabase(function(){
				var attr = {
					title : "Title",
					body  : "Body",
					created_at : new Date()  		
				} 		  		
		
				wikipages_provider.createWikiPage(attr, function(err, new_wikipage){
					db.collection('wikipages', function(err, wikipages){
						wikipages.findOne({}, function(err, wikipage){
							wikipage_id = wikipage._id
							revision_id = wikipage.current_revision
							done()
						})
					})
				});					
			
			});  	  		
  	})
  	
  	it('should return a correct wikipage object', function(done){
			wikipages_provider.fetch(wikipage_id, function(err, wikipage){
				assert.equal(wikipage._id.toString(), wikipage_id.toString())
				assert.equal(wikipage.title, "Title")
				done();
			});  	
  	})
  	
  	it('should return a joined wikipage object to the right revision', function(done){  	
			wikipages_provider.fetch(wikipage_id, function(err, wikipage){
				assert.equal(wikipage.current_revision._id.toString(), revision_id.toString())			  	
				done();
			});
  	})
  	
  	it('should return a correct wikipage object (even when passed a string ID)', function(done){
			wikipages_provider.fetch(wikipage_id.toString(), function(err, wikipage){
				assert.equal(wikipage._id.toString(), wikipage_id.toString())
				assert.equal(wikipage.title, "Title")
				done();
			});  	
  	})  
  	
  	it('should return a joined wikipage object to the right revision (even when passed a string ID)', function(done){  	
			wikipages_provider.fetch(wikipage_id.toString(), function(err, wikipage){
				assert.equal(wikipage.current_revision._id.toString(), revision_id.toString())			  	
				done();
			});
  	})

  })  
  
  
  describe('updateWikipage', function(){

		var attr = {
			title : "Title",
			body  : "Body",
			created_at : new Date()  		
		}
		
		var first_revision, second_revision, wikipage_id;
		
		var updated_wikipage = {
			body: "Updated body",
			created_at : new Date()
		}; 		

  	before(function(done){  	
  		resetDatabase(function(){
				wikipages_provider.createWikiPage(attr, function(err, new_wikipage){		
					wikipage_id = new_wikipage._id
					first_revision = new_wikipage.current_revision._id		
					wikipages_provider.updateWikiPage(new_wikipage._id.toString(), updated_wikipage, function(err, wikipage){
						second_revision = wikipage.current_revision._id
						done() 	
					}); 					
				})  		  		
  		})
  	})
  	
  	it('should create a new revision', function(done){
	  	db.collection('revisions', function(err, revisions){
	  		revisions.find().count(function(err, count){
	  			assert.equal(count, 2)
	  			done()
	  		})
	  	})  	
  	})
  	
  	it('should create a correct new revision', function(done){
	  	db.collection('revisions', function(err, revisions){
	  		revisions.findOne({_id : {$ne : first_revision} }, function(err, new_revision){
	  			assert.equal(new_revision.body, updated_wikipage.body)
	  			assert.equal(new_revision.page.toString(), wikipage_id.toString())
	  			done()
	  		})
	  	})  	
  	})

 	
  	it('should return a wikipage object joined to the latest revision', function(done){
	  	db.collection('revisions', function(err, revisions){
	  		revisions.findOne({_id : {$ne : first_revision} }, function(err, new_revision){
	  			assert.equal(new_revision._id.toString(), second_revision.toString())
	  			done()
	  		})
	  	})
  	})  
  	 
  
  })
  
 
	function resetDatabase(done){
			db.collection('wikipages', function(err, wikipages){
				wikipages.remove({})

				db.collection('revisions', function(err, revisions){
					revisions.remove({})
					done()
				})

			})
	}


  
})



