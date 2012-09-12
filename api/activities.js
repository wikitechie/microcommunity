var provider = require('./../providers/activities-provider')
	, database = require('./../providers/db');
	
exports.index = function(req, res){

	if(req.query.user){
		provider.fetchUserActivities(req.query.user, req.query.from, req.query.to, function(err, activities){
				return res.send(activities);	
		});	
	} else {
		provider.fetchActivities(req.query.from, req.query.to, function(err, activities){
				return res.send(activities);	
		});		
	}
	
};


exports.create = function(req, res){
	var activity = {
		actor: database.normalizeID(req.body.actor._id),
    verb: req.body.verb,
    object: database.normalizeID(req.body.object._id),
    object_type: req.body.object_type,
    target: database.normalizeID(req.body.target),
    target_type: req.body.target_type,    
    created_at : new Date(),
    diff: req.body.diff,
    summary: req.body.summary   
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


