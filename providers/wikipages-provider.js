var  _ = require('underscore')
  , database = require('./db')
  , revisions_provider = require('./revisions-provider')  
  ;

var db ;

exports.setup = function (database){
	db = database;
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


exports.newRevision = function (wikipage, revision, callback){

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

exports.createWikiPage = function(attr, callback){

	db.collection('wikipages', function(err, wikipages_collection){
		var wikipage_attr = {
			title: attr.title,
			created_at : new Date()
		};

		wikipages_collection.insert(wikipage_attr, function(err, docs){
				var wikipage = docs[0];
				
				var user_id = database.normalizeID(attr.user);				
				
				var revision = {
					page : wikipage._id,
					body : attr.body,
					summary : attr.summary,
					created_at : new Date()	,
					user  : user_id																
				};							

				exports.newRevision(wikipage, revision, function(err, new_wikipage){
					callback(err, new_wikipage);
				});				

		});
	});

}

exports.updateWikiPage = function(id, updated, callback){

	var object =  database.normalizeID(id);
	console.log(updated)

	db.collection('wikipages', function(err, wikipages){
		wikipages.findOne({_id: object }, function(err, wikipage){
			var user_id = database.normalizeID(updated.user);
			
			var revision = {
				page : wikipage._id,
				body : updated.body,
				created_at : new Date(),
				summary : updated.summary,
				diff : updated.diff,
				user  : user_id							
			};							
			
			exports.newRevision(wikipage, revision, function(err, wikipage){
				callback(err, wikipage);
			});			
				
		});	

	});

}

