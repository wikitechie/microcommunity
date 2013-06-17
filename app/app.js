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
	wikipagesPlugin.setupOnContainer('materials')
	app.use(wikipagesPlugin)

	//using file plugin
	filesPlugin.setupOnContainer('materials')
	app.use(filesPlugin)

	//using apps
	app.use(basic)

app.listen(3000)


