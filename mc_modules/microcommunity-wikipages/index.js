
var microcommunity = require('microcommunity')
	, models = microcommunity.models
	, items = microcommunity.items
	, auth = microcommunity.auth

//registering models
var wikipageSchema = require('./models/wikipage')
var revisionSchema = require('./models/activity')
var activitySchema = require('./models/revision')

models.define('Wikipage', 'wikipage', 'wikipages', wikipageSchema)
models.define('Revision', 'revision', 'revisions', revisionSchema)
models.define('NewWikipageActivity', 'activity:new-wikipage', 'newwikipageactivities', activitySchema)

//adding stream items
items.addItem('Revision', 'components/revision/model')
items.addItem('NewWikipageActivity', 'components/activity/model')

microcommunity.registerPlugin(__dirname)

//routes and api
var wikipagesRoutes = require('./wikipages-routes')
	, api = require('./api')	

function ContainerSidebar(req, res, next){
	var Wikipage = microcommunity.model('Wikipage')
		Wikipage.findById(req.params.wikipage, function(err, wikipage){
		var sidebar = wikipage.container.getSidebar()
		res.sidebars.pushSidebar(sidebar.header, sidebar.links)
		next()	
	})
}

//initialization function
module.exports = function(options){

	if (!options) throw new Error()
	if (!options.containersPath) throw new Error()
	var containersPath = options.containersPath

	var app = microcommunity.plugin(__dirname)
	
	app.get(containersPath + '/:container/wikipages/new', auth.ensureAuthenticated, wikipagesRoutes.new)
	app.post(containersPath +'/:container/wikipages', auth.ensureAuthenticated, wikipagesRoutes.create)
	app.get('/wikipages/:wikipage', ContainerSidebar, wikipagesRoutes.show)		
	app.put('/api/wikipages/:id', wikipagesRoutes.put)

	api(app)
	
	return app	
}

