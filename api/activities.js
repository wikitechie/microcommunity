var provider = require('./../providers/activities-provider')
	, schemas = require('./../providers/mongoose-schemas')
	, mongoose = require('mongoose');
	
exports.index = function(req, res){
	provider.fetchActivities(req.query.from, req.query.to, function(err, activities){
		return res.send(activities);	
	});
};


var ObjectID = require('mongodb').ObjectID;

exports.create = function(req, res){
	var activity = {
		actor: new ObjectID(req.body.actor._id),
    verb: req.body.verb,
    object: new ObjectID(req.body.object._id),
    object_type: req.body.object_type,
    //target: mongoose.Types.ObjectId(req.body.target._id),
    created_at : Date(),
    diff: req.body.diff
    
	};
  
  provider.createActivity(activity, function(err, new_activity){
	  return res.send(new_activity);     
  });	  
};


exports.show = function(req, res){
	provider.fetchActivity(new ObjectID(req.params.activitie), function(err, activity){
		return res.send(activity); 	
	});  
}


