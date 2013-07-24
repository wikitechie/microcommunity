var microcommunity = require('microcommunity')
	, basic = require('microcommunity-basic')
	, auth = require('microcommunity').auth
	, sidebars = microcommunity.sidebars	

microcommunity.registerApp(__dirname)

module.exports = microcommunity

//creating and setting up the app	

if (!module.parent){

	var app = microcommunity.createApplication()	

	//using basic app
	app.use(basic())	
	
	app.get('/test', function(req, res){
		res.loadPage('test', { user : 'amjad' })
	})	
	
	var port = process.env.PORT || 3000
	console.log("listening on port " + port)
	app.listen(port)

}	

module.exports = microcommunity

