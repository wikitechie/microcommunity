var should = require('should')
	, helpers = require('./helpers')	

describe('Database Collection', function(){
	helpers.dbBefore()
	
	describe('Relations', function(){
	
		describe('Single reference as a field in the document', function(){
			before(function(){
				this.db.addCollection('collection1', {
					relations : [
						{
							type : 'singleRef',
							field: 'ref', 
							collection: 'collection2' 
						}, 						
					]					
				})
				this.db.addCollection('collection2')			
			})
			after(function(){
				this.db.reset()
			})
			it ('should work', function(done){
				var self = this
				self.db.getCollection('collection2').create({}, function(err, doc2){
					self.db.getCollection('collection1').create({ ref : doc2._id }, function(err, doc1){
						should.exist(doc1.ref._id)				
						helpers.sameID(doc1.ref._id, doc2._id)
						done()					
					})				
				})
			})	
		})
		
		describe('Single reference as a field in an array member', function(){
			before(function(){
				this.db.addCollection('posts', {
					relations : [
						{
							type : 'arrayDescriptor',
							field : 'comments', 
							singleRefs : [
								{ field : 'author', collection : 'users' }
							]
						},					
					]						
				})
				this.db.addCollection('users')			
			})
			after(function(){
				this.db.reset()
			})
			it ('should work', function(done){
				var self = this
				self.db.getCollection('users').create({}, function(err, user1){
					self.db.getCollection('users').create({}, function(err, user2){
						var attr = {
							comments : [ 
								{ author : user1._id },
								{ author : user2._id } 
							]
						}
						self.db.getCollection('posts').create(attr, function(err, post){
							should.exist(post.comments[0].author._id)	
							helpers.sameID(post.comments[0].author._id, user1._id)							
							should.exist(post.comments[1].author._id)	
							helpers.sameID(post.comments[1].author._id, user2._id)								
							done()													
						})											
					})										
				})
			})	
		})
		
		describe('Array of references as a field in the document', function(){
			before(function(){
				this.db.addCollection('users', {
					relations : [
						{
							type : 'multiRef', 
							field : 'follows', 
							collection : 'users' 
						}							
					]					
				})
			})
			after(function(){
				this.db.reset()
			})
			it ('should work', function(done){
				var self = this
				self.db.getCollection('users').create({}, function(err, follower1){
					self.db.getCollection('users').create({}, function(err, follower2){	
						var user = {
							follows : [ follower1._id, follower2._id ]
						}				
						self.db.getCollection('users').create(user, function(err, user){
							should.exist(user.follows[0]._id)	
							helpers.sameID(user.follows[0]._id, follower1._id)
							should.exist(user.follows[1]._id)	
							helpers.sameID(user.follows[1]._id, follower2._id)																		
							done()
						})			
					})				
				})			
			})
		})
		
		describe('DBRefs as a field in the document', function(){
			before(function(){
				this.db.addCollection('collection', {
					relations : [
						{ 
							type : 'DBRef',
							field : 'object'							
						}					
					]			
				})
				this.db.addCollection('objects')
			})
			after(function(){
				this.db.reset()
			})
			it ('should work', function(done){
				var self = this
				self.db.getCollection('objects').create({}, function(err, obj){
					var doc = {
						object : self.db.mongo.DBRef('objects', obj._id)
					}
					self.db.getCollection('collection').create(doc, function(err, doc){
						should.exist(doc.object._id)	
						helpers.sameID(doc.object._id, obj._id)																	
						done()
					})			
			
				})			
			})
		})				
				
	
	})
	

})
