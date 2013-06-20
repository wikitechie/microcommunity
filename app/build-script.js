
var fs = require('fs')
	, _ = require('underscore')
	, microcommunity = require('./app')
	, items = microcommunity.items


microcommunity.listClientModules(function(err, mcModules){
	
	var commands = []
	
	for(var i=0; i<mcModules.length; i++){
		var mcModule = mcModules[i]
		var command = "cp -R " + mcModule.basePath + "/client/* " + __dirname + "/client-merged/"	
		commands.push(command)	
		console.log(command)
	}
	
	var command = "cp -R " + microcommunity.dirname + "/client/* " + __dirname + "/client-merged/"
	commands.push(command)		
	
	var exec=require('child_process').exec
		, async = require('async')
	
	exec('mkdir ' + __dirname + '/client-merged', function(err){	
		async.map(commands, exec, function(err, results){
		
			fs.readFile( __dirname + '/items-index-template.js', 'utf8', function (err, template) {

				var paths = items.exportItemsModulesForClient().paths
				var newPaths = []
	
				for(var i=0; i<paths.length; i++){
					var path = paths[i]
					var newPath =  "\"" + path	+ "\""
					newPaths.push(newPath)	
				}

				var file = _.template(template)({ paths : newPaths.toString() })
	
				var itemsIndexPath = __dirname + '/client-merged/models/items-index.js'
				fs.writeFile(itemsIndexPath, file, function (err) {
					console.log('items-index.js written successfully to client-merged')
				})
	
			})

			fs.readFile( __dirname + '/build-template.js', 'utf8', function (err, template) {

				var modulesList = []
				for(var i=0; i<mcModules.length; i++){
					var mcModule = mcModules[i]			
					for(var j=0; j<mcModule.modules.length; j++){
						modulesList.push({ name : 'apps' + mcModule.modules[j].name })			
					}			
				}

				var file = _.template(template)({ modules : JSON.stringify(modulesList) })
	
				var itemsIndexPath = __dirname + '/client-merged/build.js'
				fs.writeFile(itemsIndexPath, file, function (err) {
					console.log('build.js written successfully to client-merged')
				})
	
			})		
		
		
		})	
	})	




})





