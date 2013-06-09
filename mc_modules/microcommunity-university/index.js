var microcommunity = require('microcommunity')

//loading models
require('./models/material')

var app = module.exports = microcommunity.plugin(__dirname)

//routes & api
var routes = require('./routes')
routes(app)
var api = require('./api')
api(app)

//using wiki plugin
wikipagesPlugin = require('microcommunity-wiki')
wikipagesPlugin.setupOnContainer('materials')
app.use(wikipagesPlugin)

//using file plugin
var filesPlugin = require('microcommunity-files')
filesPlugin.setupOnContainer('materials')
app.use(filesPlugin)




