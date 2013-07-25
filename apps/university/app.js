var microcommunity = require('microcommunity')
	, basic = require('microcommunity-basic')
	, wikipagesPlugin = require('microcommunity-wikipages')
	, questionsPlugin = require('microcommunity-questions')
	, filesPlugin = require('microcommunity-files')
	, auth = require('microcommunity').auth	

//registering models
var materialSchema = require('./models/material')	
var coursesSchema = require('./models/course')	
microcommunity.models.define('Material', 'material', 'containers', materialSchema)
microcommunity.models.define('Course', 'course', 'courses', coursesSchema)

//creating and setting up the app	

if (!module.parent){

	var app = microcommunity.createApplication({ path : __dirname })	

	var sidebar = microcommunity.sidebars.getDefault()
	sidebar.push({label : 'Browse Materials', url : '/materials', icon : 'icon-camera-retro' })	
	
	app.useGlobal(function (req, res, next){
		res.sidebars.pushSidebar('Everything', sidebar)
		next()
	})	

	//routes
	var routes = require('./materials-routes')
	app.get('/materials/new', auth.ensureAuthenticated, auth.ensureRole('teacher'), routes.new)	
	app.post('/materials', routes.create)
	app.get('/materials/:container/members', routes.members)	
	app.get('/materials/:container/settings',	auth.ensureAuthenticated, auth.ensureContainerAdmin(), routes.settings)
	app.get('/materials/:container', routes.show)
	app.get('/materials/:container/wall', routes.wall)
	app.get('/materials/:container/stream', routes.stream)
	app.get('/materials', routes.index)
		
	app.get('/courses', auth.ensureAuthenticated, auth.ensureRoot, routes.coursesIndex)	
	app.post('/courses', auth.ensureAuthenticated, auth.ensureRoot, routes.createCourse)	


	//api
	var api = require('./api')
	api(app)

	//using external plugins
	//using wikipages plugin
	app.usePlugin(wikipagesPlugin({ containersPath : '/materials' }))
	//using file plugin
	app.usePlugin(filesPlugin({ containersPath : '/materials' }))
	app.usePlugin(questionsPlugin())
	//using basic app
	app.usePlugin(basic())
	
	var port = process.env.PORT || 3000
	console.log("listening on port " + port)
	app.listen(port)

}	

module.exports = microcommunity

