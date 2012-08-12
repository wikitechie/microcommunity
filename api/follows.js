var  database = require('./../providers/db')
  , follows_provider = require('./../providers/follows-provider'); 

exports.setup = function(database) {
	votes_provider.setup(database)
}

exports.create = function(req, res){}

app.post('/api/users/:user_id/follows', function(req, res){
		
})

