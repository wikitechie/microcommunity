
var microcommunity = require('microcommunity')
	, models = microcommunity.models
	, items = microcommunity.items
	, auth = microcommunity.auth

//registering models
var wikipageSchema = require('./models/wikipage')
var revisionSchema = require('./models/activity')
var activitySchema = require('./models/revision')

models.define('Wikipage', 'wikipage', 'wikipages', wikipageSchema)
models.define('Revision', 'revision', 'revision', revisionSchema)
models.define('NewWikipageActivity', 'activity:new-wikipage', 'newwikipageactivities', activitySchema)

//adding stream items
items.addItem('Revision', 'components/revision/model')
items.addItem('NewWikipageActivity', 'components/activity/model')

//routes and api
var wikipagesRoutes = require('./wikipages-routes')
	, api = require('./api')	

//initialization function
module.exports = function(options){

	if (!options) throw new Error()
	if (!options.containersPath) throw new Error()
	var containersPath = options.containersPath

	var app = microcommunity.plugin(__dirname)
	
	app.get(containersPath + '/:container/wikipages/new', auth.ensureAuthenticated, wikipagesRoutes.new)
	app.post(containersPath +'/:container/wikipages', auth.ensureAuthenticated, wikipagesRoutes.create)
	app.get('/wikipages/:wikipage', wikipagesRoutes.show)		
	app.put('/api/wikipages/:id', wikipagesRoutes.put)

	api(app)
	
	return app	
}

