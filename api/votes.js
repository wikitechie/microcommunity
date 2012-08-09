var  database = require('./../providers/db')
  , votes_provider = require('./../providers/votes-provider'); 

exports.setup = function(database) {
	votes_provider.setup(database)
}


exports.create = function(req, res){

	//console.log(req.body.user._id)
	votes_provider.vote( req.params.type, req.body.user._id, req.params.id, req.params.collection, function(err){
		res.send(err)		
	})
	
}

exports.destroy = function(req, res) {
	console.log(req.params)

	votes_provider.remove_vote(req.params.type, req.params.vote, req.params.id, req.params.collection,function(err){
		res.send(err)
	})

}
