var assert = require("assert")
	, wikipages_provider = require('./../providers/wikipages-provider')
	, mongoose = require('mongoose');

mongoose = mongoose.connect('mongodb://localhost/microcommunity_test');


describe('WikiPages Provider', function(){
	
  describe('fetchWikipages', function(){
  	before(function(done){
			var attr = {
				title: "Hello, World", 
				text: "Body text",
				created_at : Date()
			};
			
		  var wikipage = new wikipages_provider.model(attr);
		  
			wikipage.save(function(err) {
				if (err) throw err;
				done();				
			});

  	});
  	
  	
    it('should return the right number of wikipages', function(done){
    	wikipages_provider.fetchWikiPages(function(err, wikipages){
    		assert.equal(1, wikipages.length);   
    		done(); 	
    	});
    });
    
    after(function(done){
    	wikipages_provider.model.remove({}, function(){
    		done();
    	});
    });    
    
  });
});
