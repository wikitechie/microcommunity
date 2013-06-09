
var microcommunity = require('microcommunity')

require('./models/wikipage')
require('./models/activity')
require('./models/revision')

var app = module.exports = microcommunity.plugin(__dirname)

//api
var api = require('./api')
api(app)

var wikipagesRoutes = require('./routes')
app.setupOnContainer = function(containersPath){
	wikipagesRoutes.setup(app, containersPath)
}

