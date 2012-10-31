var coffee = require('coffee-script')
	,	wikipages_provider = require('./../providers/wikipages-provider')
	, revisions_provider = require('./../providers/revisions-provider')
	, groups_provider = require('./../providers/groups-provider')	
	, users_provider = require('./../providers/users-provider')	
	, posts_provider = require('./../providers/posts-provider')
	, async = require('async')
	, database = require('./db');

var db ;

exports.setup = function (database){
	db = database;
	wikipages_provider.setup(database);
	revisions_provider.setup(database);	
	posts_provider.setup(database);
	users_provider.setup(database);
	groups_provider.setup(database);	
	return db;
};

exports.createActivity = function(attr, callback){

	db.collection('activities', function(err, collection){
		collection.insert(attr, function(err, activity){
			exports.fetchActivity(activity[0]._id, function(err, joined_activity){
				callback(err, joined_activity);
			});
		});
	});

}

exports.fetchActivity = function (activity, callback){

	activity = database.normalizeID(activity);
	

	db.collection('activities', function(err, collection){
		collection.findOne({_id: activity},
		function(err, activity){
			db.collection('users', function(err, users){
				users.findOne({_id: database.normalizeID(activity.actor)}, function(err, actor){
					var providers_index = {
						WikiPage : wikipages_provider,
						Revision : revisions_provider,
						Post : posts_provider,
						groups : groups_provider,
						users  : users_provider
					};
					

					var object_provider = providers_index[activity.object_type];

					object_provider.fetch(activity.object, function(err, object){
					
						if (activity.target) {
							var target_provider = providers_index[activity.target_type];
							
							target_provider.fetch(activity.target, function(err, target){
								var joined_activity = {
									_id : activity._id,
									actor : actor,
									object : object,
									object_type : activity.object_type,
									target : target,
									target_type : activity.target_type,									
									verb : activity.verb,
									created_at: activity.created_at,
									diff : activity.diff,
									summary : activity.summary
								};
							
								callback(err, joined_activity);	
							
							});
							
						
						} else {
						
							var joined_activity = {
								_id : activity._id,
								actor : actor,
								object : object,
								object_type : activity.object_type,
								verb : activity.verb,
								created_at: activity.created_at,
								diff : activity.diff,
								summary : activity.summary
							};
							
							callback(err, joined_activity);						
						}						
						
					}); 

				});
			});
		}
		);
	});
}

exports.fetchJoinedActivities = function (activities, callback){
	var functions = [];    		
	var joined_activities = [];
	var j = 0;

	for(var i=0; i< activities.length; i++){
		var activity = activities[i];
		
		function myfunction(callback){		
			activity = activities[j];
			j++;
			
			exports.fetchActivity(activity._id, function(err, joined_activity){
				joined_activities.push(joined_activity);			
				callback(null);
			});
		}
		functions.push(myfunction);   		    			
	}
	
	async.waterfall(functions, function(err, result){
		callback(null, joined_activities);
	});
}


exports.fetchActivities = function (from, to, callback){
	
	db.collection('activities', function(err, collection){
		collection.find()
		.sort({created_at: -1})
		.skip(parseInt(from))
		.limit(parseInt(to))
		.toArray(function(err, result){
			exports.fetchJoinedActivities(result, function(err, result){
				callback(err, result);
			});
			
		});
	});	
}

exports.fetchUserActivities = function (user_id, from, to, callback){
	
	user_id = database.normalizeID(user_id);	
	
	db.collection('activities', function(err, collection){
		collection.find( { actor : user_id } )
		.sort({created_at: -1})
		.skip(parseInt(from))
		.limit(parseInt(to))
		.toArray(function(err, result){
			exports.fetchJoinedActivities(result, function(err, result){
				callback(err, result);
			});
			
		});
	});		
}


exports.fetchGroupActivities = function (group_id, from, to, callback){
	
	group_id = database.normalizeID(group_id);	
	
	db.collection('activities', function(err, collection){
		collection.find( { target_type : 'groups', target : group_id } )
		.sort({created_at: -1})
		.skip(parseInt(from))
		.limit(parseInt(to))
		.toArray(function(err, result){
			exports.fetchJoinedActivities(result, function(err, result){
				callback(err, result);
			});
			
		});
	});	
}


exports.fetchWikiPageActivities = function (wikipage_id, from, to, callback){
	
	wikipage_id = database.normalizeID(wikipage_id);	
	
	db.collection('activities', function(err, collection){
		collection.find( { target_type : 'WikiPage', target : wikipage_id } )
		.sort({created_at: -1})
		.skip(parseInt(from))
		.limit(parseInt(to))
		.toArray(function(err, result){
			exports.fetchJoinedActivities(result, function(err, result){
				callback(err, result);
			});
			
		});
	});	
}


