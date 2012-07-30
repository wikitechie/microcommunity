var mongoose = require('mongoose')
	, ObjectId = mongoose.Schema.ObjectId
	, schemas = require('./../providers/mongoose-schemas')
	, wikipages_provider = require('./../providers/wikipages-provider')
	, posts_provider = require('./../providers/posts-provider')
	, async = require('async');


var Db = require('mongodb').Db,
  Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;
    

var db ;

Db.connect('mongodb://localhost/microcommunity', function(err, database) {
		console.log("errors: " + err);
		db = database;
});




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

	db.collection('activities', function(err, collection){
		collection.findOne({_id: activity},
		function(err, activity){
			db.collection('users', function(err, users){
				users.findOne({_id: activity.actor}, function(err, actor){
					var providers_index = {
					WikiPage : wikipages_provider,
					Post : posts_provider
					};

					var provider = providers_index[activity.object_type];

					provider.fetch(activity.object, function(err, object){
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

