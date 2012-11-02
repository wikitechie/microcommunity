var  _ = require('underscore')
  , database = require('./db')
  , revisions_provider = require('./revisions-provider')  
  ;

var db ;

exports.setup = function (database){
	db = database;
	revisions_provider.setup(database);		
	return db;
};

exports.fetch = function (wikipage_id, callback){

	wikipage_id = database.normalizeID(wikipage_id);

	db.collection('wikipages', function(err, wikipages){
		wikipages.findOne({_id: wikipage_id }, function(err, wikipage){		
			revisions_provider.fetchWithoutPage( wikipage.current_revision , function(err, revision){
				_.extend(wikipage, {current_revision: revision});
				callback(err, wikipage);							
			})		
		});	

	});	
}

exports.createWikiPage = function(attr, callback){

	db.collection('wikipages', function(err, wikipages_collection){
	
		attr.parent._id = database.normalizeID(attr.parent._id)
		
		var wikipage_attr = {
			displayName: attr.displayName,
			objectType : 'wikipage',
			published : new Date(),
			parent : attr.parent
		};						
		

		wikipages_collection.insert(wikipage_attr, function(err, docs){
				var wikipage = docs[0];			
				
				var revision = {
					page : wikipage._id,
					content : attr.content,
					summary : attr.summary,
					author  : attr.author																
				};							

				exports.newRevision(wikipage, revision, function(err, new_wikipage){
					callback(err, new_wikipage);
				});				

		});
	});

}


exports.newRevision = function (wikipage, revision, callback){

	_.extend(revision, {
		objectType : 'revision',
		published : new Date()	
	})
	
	revision.author = database.normalizeID(revision.author);	
	revision.page = database.normalizeID(revision.page);		


	db.collection('revisions', function(err, revisions){		
		revisions.insert(revision, function(err, docs){
			var revision = docs[0];		
		
			var updated = {$set: {current_revision: revision._id }};
			
			db.collection('wikipages', function(err, wikipages_collection){
				wikipages_collection.findAndModify({_id : wikipage._id },[['_id','asc']],  updated, {},function(err, docs){
					exports.fetch(wikipage._id, function(err, updated_wikipage){
						callback(err, updated_wikipage);
					});				
				});
			});
		});
	});
}



exports.updateWikiPage = function(id, updated, callback){

	var object =  database.normalizeID(id);

	db.collection('wikipages', function(err, wikipages){
		wikipages.findOne({_id: object }, function(err, wikipage){
			
			var revision = {
				page : wikipage._id,
				content : updated.content,
				summary : updated.summary,
				diff : updated.diff,
				author  : updated.author						
			};							
			
			exports.newRevision(wikipage, revision, function(err, wikipage){
				callback(err, wikipage);
			});			
				
		});	

	});

}

