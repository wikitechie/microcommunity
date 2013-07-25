var microcommunity = require('microcommunity')
	, basic = require('microcommunity-basic')
	, wikipagesPlugin = require('microcommunity-wikipages')
	, questionsPlugin = require('microcommunity-questions')
	, filesPlugin = require('microcommunity-files')
	, auth = require('microcommunity').auth	
	, Container = microcommunity.model('Container')

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
	
	function someMaterialsSidebar(req, res, next){
		var query = { 
			containerType : 'material'
		}
		if (req.user) query['memberships.user'] = req.user.id
		
		Container.find(query).limit(5).exec(function(err, materials){	
			var links = []
			for(var i=0; i<materials.length; i++){
				var material = materials[i]
				var link = { label : material.displayName , url : '/materials/'+material.id }
				links.push(link)
			}		
			res.sidebars.pushSidebar("Materials", links)
			next()	
		})
	}	
	
	app.useGlobal(function (req, res, next){
		res.sidebars.pushSidebar('Everything', sidebar)
		next()
	})	
	
	app.useGlobal(someMaterialsSidebar)
	
	//routes
	app.use('/materials', require('./routers/materials-routes').middleware)		
	app.use('/courses', require('./routers/courses-routes').middleware)
	app.use('/api', require('./routers/api').middleware)

	//using external plugins
	app.usePlugin(wikipagesPlugin({ containersPath : '/materials' }))
	app.usePlugin(filesPlugin({ containersPath : '/materials' }))
	app.usePlugin(questionsPlugin())
	app.usePlugin(basic())
	
	var port = process.env.PORT || 3000
	console.log("listening on port " + port)
	app.listen(port)

}	

module.exports = microcommunity

