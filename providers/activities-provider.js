var mongoose = require('mongoose')
	, ObjectId = mongoose.Schema.ObjectId;

mongoose.connect('mongodb://localhost/microcommunity');


exports.model = mongoose.model('Activity', new mongoose.Schema({
	actor : ObjectId,
	verb  : String, 
	object: ObjectId,
	target: ObjectId
}));

exports.fetchActivity = function (activity, callback){
	exports.model.findById(activity, function(err, activity) {
		callback(err, activity);
	});	
}

exports.fetchActivities = function (callback){
	exports.model.find({}, function(err, activities) {
		callback(err, activities);
	});	
}

exports.createActivity = function(attr, callback){
  var activity = new exports.model(attr);
  activity.save(function(err) {
		callback(err, activity);
  });
}

