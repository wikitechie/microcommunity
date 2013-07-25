var microcommunity = require('microcommunity')
	, basic = require('microcommunity-basic')
	, auth = require('microcommunity').auth
	, sidebars = microcommunity.sidebars	

//creating and setting up the app	

if (!module.parent){

	var app = microcommunity.createApplication({ path : __dirname })
	
	app.get('/test', function(req, res){
		res.loadPage('test', { user : 'amjad' })
	})	
	
	app.useGlobal(function (req, res, next){
		res.sidebars.pushSidebar('Everything', sidebars.getDefault())
		next()
	})		
	
	//using basic app
	app.usePlugin(basic())		
	
	var port = process.env.PORT || 3000
	console.log("listening on port " + port)
	app.listen(port)

}	

module.exports = microcommunity

