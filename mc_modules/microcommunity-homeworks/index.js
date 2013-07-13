
var microcommunity = require('microcommunity')
	, models = microcommunity.models
	, items = microcommunity.items
	, auth = microcommunity.auth

//registering models
var homeworkSchema = require('./models/homework')
var activitySchema = require('./models/new-homework-activity')

models.define('Homework', 'homework', 'homeworks', homeworkSchema)
models.define('NewHomeworkActivity', 'activity:new-homework', 'items', activitySchema)

//adding stream items
items.addItem('NewHomeworkActivity', 'components/new-homework-activity/model')

microcommunity.registerPlugin(__dirname)

//routes and api
var homeworksRoutes = require('./homeworks-routes')
	, api = require('./api')	

function ContainerSidebar(req, res, next){
	var Homework = microcommunity.model('Homework')
		Homework.findById(req.params.homework, function(err, homework){
		var sidebar = homework.container.getSidebar()
		res.sidebars.pushSidebar(sidebar.header, sidebar.links)
		next()	
	})
}

function middleware(req, res, next){
	var Homework = microcommunity.model('Homework')
	Homework.findById(req.params.homework, function(err, homework){
		req.homework = homework		
		req.container = homework.container
		next()
	})
}

function containerMiddleware(req, res, next){
	if (req.user){
		var membership = req.container.isMember(req.user)
		if (membership){
			req.containerMembership = membership
		}
	}						
	next()
}  


//initialization function
module.exports = function(options){

	if (!options) throw new Error()
	if (!options.containersPath) throw new Error()
	var containersPath = options.containersPath

	var app = microcommunity.plugin(__dirname)
	
	app.get(containersPath + '/:container/homeworks/new', 
		auth.ensureAuthenticated,
		auth.ensureContainerAdmin(),		
	homeworksRoutes.new)
	app.post(containersPath +'/:container/homeworks', auth.ensureAuthenticated, homeworksRoutes.create)
	app.get('/homeworks/:homework', middleware, containerMiddleware, ContainerSidebar, homeworksRoutes.show)	
		
	app.get('/homeworks/:homework/submissions', 
		middleware, containerMiddleware, 
		auth.ensureAuthenticated,
		auth.ensureContainerAdmin(),		
		ContainerSidebar, homeworksRoutes.submissions)	
		
	app.post('/api/homeworks/:homework/submissions', 
		middleware, containerMiddleware, 
		auth.ensureAuthenticated,
		auth.ensureContainerMember(),
		containerMiddleware, ContainerSidebar, homeworksRoutes.newSubmission)						

	api(app)
	
	return app	
}

