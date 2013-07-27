var microcommunity = require('microcommunity')
	, basic = require('microcommunity-basic')
	, auth = require('microcommunity').auth
	, sidebars = microcommunity.sidebars	

//registering models
microcommunity.models.define('Group', 'group', 'containers', require('./models/group'))

//creating and setting up the app	

if (!module.parent){

	var app = microcommunity.createApplication({ path : __dirname })
	
	app.get('/test', function(req, res){
		res.loadPage('test', { user : 'amjad' })
	})
	
	app.useGlobal(require('./sidebars').default)
	app.useGlobal(require('./sidebars').groups)	
	
	app.use('/groups', require('./routers/groups').middleware)	
	app.use('/api', require('./routers/api').middleware)	

	//using basic app
	app.usePlugin(basic())		
	
	var port = process.env.PORT || 3000
	console.log("listening on port " + port)
	app.listen(port)

}	

module.exports = microcommunity

