var microcommunity = require('microcommunity')
	, models = microcommunity.models
	, items = microcommunity.items
	, auth = microcommunity.auth

//registering models
var fileSchema = require('./models/file')
var newFileActivitySchema = require('./models/new-file-activity')

models.define('File', 'file', 'files', fileSchema)
models.define('NewFileActivity', 'activity:new-file', 'items', newFileActivitySchema)
items.addItem('NewFileActivity', 'componenets/new-file-activity/model')

var routes = require('./files-routes')

//initialization function
module.exports = function(options){

	if (!options) throw new Error()
	if (!options.containersPath) throw new Error()
	var containersPath = options.containersPath
	
	var app = microcommunity.createPlugin({ path : __dirname })

	app.get(containersPath + '/:container/files/new', auth.ensureAuthenticated, routes.new)
	app.post(containersPath + '/:container/files', auth.ensureAuthenticated, routes.create)
	app.get('/files/:file', routes.show)
	
	return app
}

