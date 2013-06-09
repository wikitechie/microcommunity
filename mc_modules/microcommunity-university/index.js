var microcommunity = require('microcommunity')
	, wikipagesPlugin = require('microcommunity-wikipages')
	, filesPlugin = require('microcommunity-files')	
	
//loading models
require('./models/material')

var app = module.exports = microcommunity.plugin(__dirname)

//routes & api
var routes = require('./routes')
routes(app)
var api = require('./api')
api(app)

//using wikipages plugin

wikipagesPlugin.setupOnContainer('materials')
app.use(wikipagesPlugin)

//using file plugin
filesPlugin.setupOnContainer('materials')
app.use(filesPlugin)











