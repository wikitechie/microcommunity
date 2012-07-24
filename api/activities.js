var provider = require('./../providers/activities-provider')
	, schemas = require('./../providers/mongoose-schemas')
	, mongoose = require('mongoose');
	
exports.index = function(req, res){
	provider.fetchActivities(function(err, activities){
		return res.send(activities);	
	});
};

exports.create = function(req, res){
	var activity = {
		actor: mongoose.Types.ObjectId(req.body.actor._id),
    verb: req.body.verb,
    object: mongoose.Types.ObjectId(req.body.object._id),
    object_type: req.body.object_type,
    //target: mongoose.Types.ObjectId(req.body.target._id),
    created_at : Date()
	};
  
  provider.createActivity(activity, function(err, new_activity){
  	console.log(new_activity);
	  return res.send(new_activity);     
  });	  
};


exports.show = function(req, res){
	provider.fetchActivity(req.params.activitie, function(err, activity){
		return res.send(activity); 	
	});  
}


