var  database = require('./../providers/db')
  , votes_provider = require('./../providers/votes-provider'); 

exports.setup = function(database) {
	votes_provider.setup(database)
}


exports.create = function(req, res){

	//console.log(req.body.user._id)
	votes_provider.up_vote( req.body.user._id, req.params.id, req.params.collection, function(err, vote){
		console.log(err)	
		res.send(vote)		
	})
	
}
