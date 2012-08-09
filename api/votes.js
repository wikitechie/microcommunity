var  database = require('./../providers/db')
  , votes_provider = require('./../providers/votes-provider'); 

exports.setup = function(database) {
	votes_provider.setup(database)
}

exports.create = function(req, res){

	votes_provider.vote( req.params.type, req.body.user._id, req.params.id, req.params.collection, function(err){
		if (!err)
			res.send({success : true})		
	})
	
}

exports.destroy = function(req, res) {

	votes_provider.remove_vote(req.params.type, req.params.vote, req.params.id, req.params.collection,function(err){
		if (!err)	
			res.send({success : true})		
	})

}
