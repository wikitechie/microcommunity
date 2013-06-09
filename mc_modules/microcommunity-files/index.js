var microcommunity = require('microcommunity')

//registering models
require('./models/file')

var app = module.exports = microcommunity.plugin(__dirname)

var routes = require('./routes')
app.setupOnContainer = function(containersPath){
	routes.setup(app, containersPath)
} 
