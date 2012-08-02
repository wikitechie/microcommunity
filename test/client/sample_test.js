define(['cs!models/post'], function(Post){

	describe('Post Model', function(){
	
	  it('should have the proper url', function(){
	  	var post = new Post();
	    chai.assert.equal(post.url(), '/api/posts');
	  });
	  
	  it('should require a text', function(){
	  	var post = new Post();
	  	chai.assert.equal(post.isValid(), false);
	  });

		
		
	});
	
	
	
});

