
var microcommunity = require('microcommunity')

require('./models/wiki')

var app = module.exports = microcommunity.plugin(__dirname)

//routes
var routes = require('./routes')
routes(app)

//using wikipages plugin
wikipagesPlugin = require('microcommunity-wikipages')
wikipagesPlugin.setupOnContainer('wikis')
app.use(wikipagesPlugin)
