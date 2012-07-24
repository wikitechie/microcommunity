var mongoose = require('mongoose')
	, ObjectId = mongoose.Schema.ObjectId
	, schemas = require('./../providers/mongoose-schemas')
	, wikipages_provider = require('./../providers/wikipages-provider')
	, posts_provider = require('./../providers/posts-provider')
	, async = require('async');

mongoose.connect('mongodb://localhost/microcommunity');

exports.model = mongoose.model('Activity', new mongoose.Schema({
	actor : ObjectId,
	verb  : String, 
	object: ObjectId,
	object_type : String,
	target: ObjectId,
	created_at: Date
}));

exports.fetchActivity = function (activity, callback){
	exports.model.findById(activity, function(err, activity) {
		schemas.User.findById(activity.actor, function(err, actor){
			
			var providers_index = {
				WikiPage : wikipages_provider,
				Post : posts_provider
			};
			
			var provider = providers_index[activity.object_type];
			
			provider.fetch(activity.object, function(err, object){
				var joined_activity = {
					_id    : activity._id,
					actor  : actor,
					object : object,
					object_type : activity.object_type,
					verb   : activity.verb,
					created_at: activity.created_at
				};
				callback(err, joined_activity);
			});		

		});
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
			
			exports.fetchActivity(activity, function(err, joined_activity){
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


exports.fetchActivities = function (callback){
  exports.model.find(function(err, activities) {	
		if(!err){
			exports.fetchJoinedActivities(activities, function(err, joined_activities){
				callback(err, joined_activities);											
			});
		}
});

}

exports.createActivity = function(attr, callback){
  var activity = new exports.model(attr);
  activity.save(function(err) {
		callback(err, activity);
		
  });
}

