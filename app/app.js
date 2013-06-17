var microcommunity = require('microcommunity')
	, basic = require('microcommunity-basic')
	, wikipagesPlugin = require('microcommunity-wikipages')
	, filesPlugin = require('microcommunity-files')

//registering models
var materialSchema = require('./models/material')	
microcommunity.models.define('Material', 'material', 'containers', materialSchema)
	
//creating and setting up the app	
var app = microcommunity.createApplication(__dirname)	

//routes & api
var routes = require('./routes')
routes(app)
var api = require('./api')
api(app)

//using external plugins
	//using wikipages plugin
	app.use(wikipagesPlugin({ containersPath : '/materials' }))
	//using file plugin
	app.use(filesPlugin({ containersPath : '/materials' }))
	//using basic app
	app.use(basic)

app.listen(3000)


