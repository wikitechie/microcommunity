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

	//applying global sidebars	
	app.useGlobal(require('./sidebars').default)
	app.useGlobal(require('./sidebars').materials)	
	
	//routes
	app.use('/materials', require('./routers/materials').middleware)		
	app.use('/courses', require('./routers/courses').middleware)
	app.use('/api', require('./routers/api').middleware)

	//using external plugins
	app.usePlugin(wikipagesPlugin({ containersPath : '/materials' }))
	app.usePlugin(filesPlugin({ containersPath : '/materials' }))
	app.usePlugin(questionsPlugin())
	app.usePlugin(basic())
	
	//starting up application	
	var port = process.env.PORT || 3000
	console.log("listening on port " + port)
	app.listen(port)

}	

module.exports = microcommunity

